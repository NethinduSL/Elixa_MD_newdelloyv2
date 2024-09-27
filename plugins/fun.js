const { dare, truth, random_question } = require('../lib/Elixalove.js');
const axios = require('axios');
const { cmd } = require('../lib');

//---------------------------------------------------------------------------
cmd({
        pattern: "question",
        desc: "Random Question.",
        category: "fun",
        filename: __filename,
    },
    async (conn, mek, m, {
        from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, 
        botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, 
        participants, groupAdmins, isBotAdmins, isAdmins, reply
    }) => {
        return reply(`${random_question()}`);
    }
);

//---------------------------------------------------------------------------
cmd({
        pattern: "truth",
        desc: "Truth and Dare (truth game).",
        category: "fun",
        filename: __filename,
    },
    async (conn, mek, m, {
        from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, 
        botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, 
        participants, groupAdmins, isBotAdmins, isAdmins, reply
    }) => {
        return reply(`${truth()}`);
    }
);

//---------------------------------------------------------------------------
cmd({
        pattern: "dare",
        desc: "Truth and Dare (dare game).",
        category: "fun",
        filename: __filename,
    },
    async (conn, mek, m, {
        from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, 
        botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, 
        participants, groupAdmins, isBotAdmins, isAdmins, reply
    }) => {
        return reply(`${dare()}`);
    }
);

//---------------------------------------------------------------------------
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
        return reply(`*Fact:* ${data.fact}\n\n*Powered by IZUKU*`);
    }
);

//---------------------------------------------------------------------------
cmd({
        pattern: "quotes",
        desc: "Sends quotes in chat.",
        category: "fun",
        filename: __filename,
    },
    async (conn, mek, m, {
        from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, 
        botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, 
        participants, groupAdmins, isBotAdmins, isAdmins, reply
    }) => {
        var quoo = await axios.get(`https://favqs.com/api/qotd`);
        const replyf = `
✻ ═════ •❅• ═════ ✼
║ *🗂Content:* ${quoo.data.quote.body}
║ *👤Author:* ${quoo.data.quote.author}
✻ ═════ •❅• ═════ ✼`;
        return reply(replyf);
    }
);

//---------------------------------------------------------------------------
cmd({
        pattern: "define",
        desc: "Urban dictionary.",
        category: "fun",
        filename: __filename,
    },
    async (conn, mek, m, {
        from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, 
        botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, 
        participants, groupAdmins, isBotAdmins, isAdmins, reply
    }) => {
        try {
            let { data } = await axios.get(`http://api.urbandictionary.com/v0/define?term=${q}`);
            var textt = `
            Word: ${q}
            Definition: ${data.list[0].definition.replace(/\[/g, "").replace(/\]/g, "")}
            Example: ${data.list[0].example.replace(/\[/g, "").replace(/\]/g, "")}`;
            return reply(textt);
        } catch {
            return reply(`No result for ${q}`);
        }
    }
);

//------------------------------------------------------------------
cmd({
        pattern: 'chatgpt',
        desc: 'Ask the AI a question',
        category: "AI",
    },
    async (conn, mek, m, {
        from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, 
        botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, 
        participants, groupAdmins, isBotAdmins, isAdmins, reply
    }) => {
        if (!q) return reply('Please provide a question to ask the AI.');
        try {
            let response = await axios.get(`https://rest-api.akuari.my.id/ai/gbard?chat=${encodeURIComponent(q.trim())}`);
            let data = response.data;
            if (!data.respon) return reply('Sorry, I couldn\'t retrieve a response from the AI.');
            return reply(data.respon);
        } catch (error) {
            return reply(`Error: ${error.message || error}`);
        }
    }
);

//---------------------------------------------------------------------------
cmd({
        pattern: 'rizz',
        category: "fun",
        desc: 'Get a random pickup line',
    },
    async (conn, mek, m, {
        from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, 
        botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, 
        participants, groupAdmins, isBotAdmins, isAdmins, reply
    }) => {
        try {
            let response = await axios.get('https://vinuxd.vercel.app/api/pickup');
            let data = response.data;
            if (!data || !data.pickup) return reply('Unable to retrieve a pickup line. Please try again later.');
            return reply(`*Pickup Line:* ${data.pickup}`);
        } catch (error) {
            return reply(`Error: ${error.message || error}`);
        }
    }
);

//---------------------------------------------------------------------------
cmd({
        pattern: 'bible',
        desc: 'Get a Bible verse',
        category: "RELIGION",
    },
    async (conn, mek, m, {
        from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, 
        botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, 
        participants, groupAdmins, isBotAdmins, isAdmins, reply
    }) => {
        if (!q) return reply('Please provide a valid Bible verse reference.');
        try {
            let response = await axios.get(`https://bible-api.com/${encodeURIComponent(q)}`);
            let data = response.data;
            if (!data || !data.verses || data.verses.length === 0) return reply('Unable to retrieve the Bible verse. Please check the reference and try again.');
            let verseText = data.verses[0].text;
            let translationName = data.translation_name;
            return reply(`*${q} (${translationName}):*\n${verseText}`);
        } catch (error) {
            return reply(`Error: ${error.message || error}`);
        }
    }
);

//---------------------------------------------------------------------------
cmd({
        pattern: 'insult',
        desc: 'Get a random insult',
        category: "fun",
    },
    async (conn, mek, m, {
        from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, 
        botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, 
        participants, groupAdmins, isBotAdmins, isAdmins, reply
    }) => {
        try {
            let response = await axios.get('https://evilinsult.com/generate_insult.php?lang=en&type=json');
            let data = response.data;
            if (!data || !data.insult) return reply('Unable to retrieve an insult. Please try again later.');
            return reply(`*Insult:* ${data.insult}`);
        } catch (error) {
            return reply(`Error: ${error.message || error}`);
        }
    }
);

//---------------------------------------------------------------------------
cmd({
        pattern: "wouldyourather",
        alias: "wyr",
        desc: "Would You Rather question",
        category: "fun",
        filename: __filename,
    },
    async (conn, mek, m, {
        from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber
