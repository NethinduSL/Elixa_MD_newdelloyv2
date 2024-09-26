const axios = require('axios');
const { cmd } = require('../command');

// -----------------------------------------------------------------------------
cmd({
    pattern: "movie",
    category: "search",
    desc: "Sends image of asked Movie/Series.",
    use: '<movie_name>',
    react: "🎞️",
    filename: __filename,
}, async (conn, m, { q, reply }) => { // Adjusted function signature
    
    if (!q) return reply(`*Please give me a movie name* ❗`);

    try {
        // Fetch movie data
        let fids = await axios.get(`https://www.omdbapi.com/?apikey=742b2d09&t=${q}&plot=full`);

        // Handle if movie is not found
        if (fids.data.Response === "False") {
            return reply(`*Movie not found* ❗`);
        }

        // Formatting movie data
        let imdbt = "╭─────────────────╮\n``` Movie info```\n╰─────────────────╯\n";
        imdbt += `🎬 Title      : ${fids.data.Title}\n\n`;
        imdbt += `📅 Year       : ${fids.data.Year}\n\n`;
        imdbt += `⭐ Rated      : ${fids.data.Rated}\n\n`;
        imdbt += `📆 Released   : ${fids.data.Released}\n\n`;
        imdbt += `⏳ Runtime    : ${fids.data.Runtime}\n\n`;
        imdbt += `🌀 Genre      : ${fids.data.Genre}\n\n`;
        imdbt += `👨🏻‍💻 Director   : ${fids.data.Director}\n\n`;
        imdbt += `✍ Writer     : ${fids.data.Writer}\n\n`;
        imdbt += `👨 Actors     : ${fids.data.Actors}\n\n`;
        imdbt += `📃 Plot       : ${fids.data.Plot}\n\n`;
        imdbt += `🌐 Language   : ${fids.data.Language}\n\n`;
        imdbt += `🌍 Country    : ${fids.data.Country}\n\n`;
        imdbt += `🎖️ Awards     : ${fids.data.Awards}\n\n`;
        imdbt += `📦 BoxOffice  : ${fids.data.BoxOffice}\n\n`;
        imdbt += `🏙️ Production : ${fids.data.Production}\n\n`;
        imdbt += `🌟 imdbRating : ${fids.data.imdbRating}\n\n`;
        imdbt += `❎ imdbVotes  : ${fids.data.imdbVotes}`;

        // Check if the poster exists
        const posterUrl = fids.data.Poster !== "N/A" ? fids.data.Poster : null;

        // Send movie info with or without poster
        await conn.sendMessage(m.chat, { text: imdbt }, { quoted: m });
        

    } catch (error) {
        console.error(error);
        reply(`*An error occurred while fetching the movie info* ❗`);
    }
});
