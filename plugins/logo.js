const config = require('../config');
const { cmd, commands } = require('../command');



cmd({
        pattern: "repo",
        alias: ["git", "sc", "script"],
        desc: "Sends info about repo.",
        category: "general",
  react:"👍",
        filename: __filename,
    },
    async(Void, citel) => {
        let { data } = await axios.get('https://api.github.com/repos/Eboxsl/Elixa_MD')
        let cap = `Hey ${citel.pushName}\n
╭┈─────────────────────    .· * • ˚
│*⭐ Total Stars:* ${data.stargazers_count} stars
│*🍴 Forks:* ${data.forks_count} forks
│*📡 Repo:* https://github.com/Eboxsl/Elixa_MD
│*🏘Group:* https://github.com/Eboxsl/Elixa_MD
│*🧑‍💻Deploy*:https://github.com/Eboxsl/Elixa_MD
╰──────────────────────✬      * ˚  ✶`
        let buttonMessaged = {
            image: { url: await botpic() },
            caption: cap,
            footer: tlang().footer,
            headerType: 4,
            contextInfo: {
                externalAdReply: {
                    title: "IZUKU-Repo",
                    body: "Easy to Use",
                    thumbnail: log0,
                    mediaType: 4,
                    mediaUrl: '',
                    sourceUrl: ``,
                },
            },
        };
        return await Void.sendMessage(citel.chat, buttonMessaged, {
            quoted: citel,
        });

    }
)
