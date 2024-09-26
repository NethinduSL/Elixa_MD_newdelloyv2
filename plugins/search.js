const axios = require('axios');  // Added missing axios import
const config = require('../config');
const { cmd, commands } = require('../command');

// -----------------------------------------------------------------------------
cmd({
    pattern: "movie",
    category: "search",
    desc: "Sends image of asked Movie/Series.",
    use: '<text>',
    react: "🎞️",
    filename: __filename,
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    
    if (!q) return citel.reply(`*Please give me a movie name* ❗`);

    try {
        // Fetch movie data
        let fids = await axios.get(`https://www.omdbapi.com/?apikey=742b2d09&t=${q}&plot=full`);

        if (fids.data.Response === "False") {
            return citel.reply(`*Movie not found* ❗`);
        }

        // Formatting movie data
        let imdbt = "╭─────────────────╮\n``` Movie info```\n╰─────────────────╯\n> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺\n";
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
        if (posterUrl) {
            await Void.sendMessage(citel.chat, {
                image: { url: posterUrl },
                caption: imdbt,
            }, { quoted: citel });
        } else {
            await Void.sendMessage(citel.chat, { text: imdbt }, { quoted: citel });
        }

    } catch (error) {
        console.error(error);
        citel.reply(`*An error occurred while fetching the movie info* ❗`);
    }
});
