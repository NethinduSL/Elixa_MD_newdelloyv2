const { cmd } = require('../command');
const axios = require('axios');

cmd({
        pattern: "nt",
        desc: "Sends info about repo.",
        react:"💝",
        category: "general",
        filename: __filename,
    },
    async (Void, citel) => {
        let { data } = await axios.get('https://raw.githubusercontent.com/Eboxsl/ELAUTO/refs/heads/main/publicconfig.js');
            let msg = `${data.Nethindu}`

            await conn.sendMessage(m.chat, { text: msg }, { quoted: m });

        }
    }
);
