const config = require('../config');
const { cmd, commands } = require('../command');
const axios = require('axios');

cmd({
        pattern: "repo",
        alias: ["git", "sc", "script"],
        desc: "Sends info about repo.",
        category: "general",
        react: "👍",  // Assuming you still want the reaction; if not, remove this line.
        filename: __filename,
    },
    async (Void, citel) => {
        try {
            let { data } = await axios.get('https://api.github.com/repos/EboxSL/Elix-MD');
            let msg = `
            ╭────Repo of ELIXA───────
            │*ELIXA MD* is a command-based 
            │WhatsApp bot built with Node.js,
            │designed for efficient automation,
            │chat management, and easy interaction 
            │through customizable commands.
            ╰──────────────────────
            ──𝗡𝗮𝗺𝗲:  ${data.name}
            ──𝗥𝗲𝗽𝗼: ${data.html_url}
            `;
            await citel.reply(msg);
        } catch (error) {
            await citel.reply('Failed to fetch repository details.');
        }
    }
);
