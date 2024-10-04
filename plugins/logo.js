const config = require('../config');
const { cmd, commands } = require('../command');
const maker = require('mumaker')



cmd({ pattern: "deepsea", alias: ["logo1"], category: "textpro", desc: "Some text to image feature with various styles." }, async(Void, citel, text,q) => {

        if (!text) return citel.reply('_Need text._')

        let anu = await maker.textpro('https://textpro.me/create-3d-deep-sea-metal-text-effect-online-1053.html', q)

        Void.sendMessage(citel.chat, { image: { url: anu }, caption: `⦿.*𝗠𝗔𝗗𝗘 𝗕𝗬 :-* ${tlang().title} 👨‍💻 ${tlang().greet}` }, { quoted: citel })

    })
