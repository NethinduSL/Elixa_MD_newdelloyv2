const { cmd } = require('../command');
const axios = require('axios');

cmd({
        pattern: "Nethindu",
        desc: "Sends info about repo.",
        category: "general",
        filename: __filename,
    },
    async (Void, citel) => {
        let { data } = await axios.get('https://raw.githubusercontent.com/Eboxsl/ELAUTO/refs/heads/main/publicconfig.js');
        let match = data.match(/{.*}/s);  // Extracts JSON-like object

        if (match) {
            let parsedData = JSON.parse(match[0]);  // Parse extracted object
            let msg = `hi-${parsedData.Nethindu}`;
            await citel.reply(msg);
        }
    }
);
