


const config = require('../config');
const { cmd, commands } = require('../command');
const axios = require('axios');

cmd({
        pattern: "hi",
        desc: "Sends info about repo.",
        category: "general",
        react: "👍",  // Assuming you still want the reaction; if not, remove this line.
        filename: __filename,
    },
    async (Void, citel) => {
        try {
            let { data } = await axios.get('https://raw.githubusercontent.com/Eboxsl/ELAUTO/refs/heads/main/publicconfig.js');
            let msg = `
            ╭────Repo of ELIXA───────
            │*ELIXA MD* is a command-based 
            │WhatsApp bot built with Node.js,
            │designed for efficient automation,
            │chat management, and easy interaction 
            │through customizable commands.
            ╰──────────────────────
            ──𝗡𝗮𝗺𝗲:  ${data.hi}
            `;
            await citel.reply(msg);
        } catch (error) {
            await citel.reply('Failed to fetch repository details.');
        }
    }
);
