const axios = require('axios');
const { cmd, commands } = require('../command');

//╭──────────────────────fact──────────────────────╮//

cmd({
        pattern: "fact",
        desc: "Sends a fact in chat.",
        category: "fun",
        filename: __filename,
    },
    async (conn, mek, m, {
        from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, 
        botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, 
        participants, groupAdmins, isBotAdmins, isAdmins, reply
    }) => {
        const { data } = await axios.get(`https://nekos.life/api/v2/fact`);
        return reply(`*Fact:* ${data.fact}\n\n> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺`);
    }
);

//╭──────────────────────$──────────────────────╮//


