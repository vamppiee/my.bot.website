const { Client, GatewayIntentBits } = require('discord.js');
const http = require('http');

// Tạo một web server ảo siêu mini để Render không bao giờ quét thiếu port nữa
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Dạaaaa bot Discord của Thảo senpai vẫn đang chạy mượt mà nha! 🌸\n');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Web server ảo đang lắng nghe trên cổng ${PORT}`);
});

// Khởi động bot Discord
const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] 
});

client.once('ready', () => {
    console.log(`Dạaaaa bot đã thức giấc thành công: ${client.user.tag}`);
});

client.on('messageCreate', message => {
    if (message.author.bot) return;
    if (message.content === '!ping') {
        message.reply('Dạaaaa hậu bối bot vẫn đang nghe senpai gọi nè! 🌸✨');
    }
});

client.login(process.env.DISCORD_TOKEN);
