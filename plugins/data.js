const { cmd } = require('../command');
const axios = require('axios');

cmd({
        pattern: "nt",
        desc: "Sends info about repo.",
        react: "💝",
        category: "general",
        filename: __filename,
    },
    async (Void, citel) => {
        try {
            let { data } = await axios.get('https://raw.githubusercontent.com/Eboxsl/ELAUTO/refs/heads/main/publicconfig.js');
            let msg = data.Nethindu;
            console.log(msg);
            
            await conn.sendMessage(citel.chat, { text: msg }, { quoted: citel });
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }
);
