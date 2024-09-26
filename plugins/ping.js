const config = require('../config');
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');  

// A helper function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

cmd({
    pattern: "ping",
    desc: "To check ping",
    category: "main",
    filename: __filename,
}, 
async (Void, citel) => {
    var initial = new Date().getTime();

    // Send initial ping testing message
    const { key } = await Void.sendMessage(citel.chat, { text: '```𝗧𝗲𝘀𝘁𝗶𝗻𝗴 𝗽𝗶𝗻𝗴 𝗼𝗳 𝗘𝗹𝗶𝘅𝗮...```' });

    // Simulate delay
    var final = new Date().getTime();
    await sleep(1000);

    // Send the calculated ping
    const pg = await Void.sendMessage(citel.chat, { text: '📍 *ᴘɪɴɢ: ' + (final - initial) + ' ms*' });

    // Send reaction
    return await Void.sendMessage(citel.chat, { react: { text: '✔️', key: pg.key } });
});
