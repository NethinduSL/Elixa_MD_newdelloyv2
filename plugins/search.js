const axios = require('axios');
const { cmd } = require('../command');

cmd({
    pattern: "movie",
    category: "search",
    desc: "Sends image of asked Movie/Series.",
    use: '<movie_name>',
    filename: __filename,
}, async (conn, m, {
    from, quoted, body, args, reply
}) => {
    
    try {
        // Ensure 'q' captures the movie name
        const q = args.join(" ").trim();

        // Check if movie name is provided
        if (!q) {
            return reply(`*Please provide a movie name* ❗`);
        }

        // Fetch movie data from OMDB API
        const fids = await axios.get(`https://www.omdbapi.com/?apikey=742b2d09&t=${q}&plot=full`);

        // Handle if movie is not found
        if (fids.data.Response === "False") {
            return reply(`*Movie not found* ❗`);
        }

        // Formatting movie data
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
        
        // Create the variable 'cap' with the specified string
        const cap = "𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺";
        
        // Check if the poster exists
        const posterUrl = fids.data.Poster !== "N/A" ? fids.data.Poster : null;

        // Send movie info with or without poster
        if (posterUrl) {
            await conn.sendMessage(from, {
                image: { url: posterUrl },
                caption: `${imdbt}\n${cap}`, // Add 'cap' to the caption
            }, { quoted: m });
        } else {
            await conn.sendMessage(from, { text: `${imdbt}\n${cap}` }, { quoted: m });
        }

    } catch (error) {
        console.error(error);
        reply(`*An error occurred while fetching the movie info* ❗`);
    }
});




//╭──────────────────────Google──────────────────────╮//




cmd({
            pattern: "google",
            category: "search",
            desc: "Sends info of given query from Google Search.",
            use: '<text>',
            filename: __filename,
        },
    async (conn, m, {
    from, quoted, body, args, reply
}) => {
        
            if (!q) throw `Example : .Google Elixa md`
            let google = require('google-it')
            google({ 'query': q }).then(res => {
                let text = `Google Search From : ${q}\n\n`
                for (let g of res) {
                    text += `➣ *Title* : ${g.title}\n`
                    text += `➣ *Description* : ${g.snippet}\n`
                    text += `➣ *Link* : ${g.link}\n\n────────────────────────\n\n`
                }
                citel.reply(text)
            })

        }
    )


