const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] 
});

client.once('ready', () => {
    console.log(`Dạaaaa bot đã thức giấc thành công rực rỡ: ${client.user.tag}`);
});

client.on('messageCreate', message => {
    if (message.author.bot) return;
    if (message.content === '!ping') {
        message.reply('Dạaaaa hậu bối bot vẫn đang nghe senpai gọi nè! 🌸✨');
    }
});

client.login(process.env.DISCORD_TOKEN);
