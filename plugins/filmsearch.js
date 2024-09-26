const axios = require('axios');
const { cmd } = require('../command');

cmd({
    pattern: "movie",
    category: "search",
    desc: "Sends image of asked Movie/Series.",
    use: '<movie_name>',
    filename: __filename,
}, async (conn, m, { from, quoted, body, args, reply }) => {
    try {
        const q = args.join(" ").trim();
        if (!q) {
            return reply(`*Please provide a movie name* ❗`);
        }
        const fids = await axios.get(`https://www.omdbapi.com/?apikey=742b2d09&t=${q}&plot=full`);
        if (fids.data.Response === "False") {
            return reply(`*Movie not found* ❗`);
        }
        let imdbt = "╭─────────────────╮\n    𝗠𝗢𝗩𝗜𝗘 𝗜𝗡𝗙𝗢\n╰─────────────────╯\n";
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
        const cap = "𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺";
        const posterUrl = fids.data.Poster !== "N/A" ? fids.data.Poster : null;
        if (posterUrl) {
            await conn.sendMessage(from, {
                image: { url: posterUrl },
                caption: `${imdbt}\n${cap}`,
            }, { quoted: m });
        } else {
            await conn.sendMessage(from, { text: `${imdbt}\n${cap}` }, { quoted: m });
        }
    } catch (error) {
        console.error(error);
        reply(`*An error occurred while fetching the movie info* ❗`);
    }
});

