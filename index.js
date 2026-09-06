const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent 
    ] 
});

client.once('ready', () => {
    console.log(`Dạaaaa bot đã thức giấc cùng senpai: ${client.user.tag}`);
});

// Lắng nghe lệnh dạng chat (hoặc slash command)
client.on('messageCreate', async message => {
    if (message.author.bot) return;

    // Lệnh test đổi bio nhanh: gõ "!doibio Nội_dung_bio_mới"
    if (message.content.startsWith('!doibio ')) {
        const bioMoi = message.content.slice(8);
        try {
            const botMember = message.guild.members.me;
            // Cập nhật bio riêng cho server này
            await botMember.edit({ bio: bioMoi });
            message.reply(`Dạaaaa bio riêng cho server này đã được đổi thành: **${bioMoi}** rùi nha senpai ơi! 🌸✨`);
        } catch (error) {
            console.error(error);
            message.reply('Hổng đổi được bio gòi senpai ơi, kiểm tra lại quyền của bot giúp em nha! 🥺💔');
        }
    }
});

// Đăng nhập bot bằng Token bảo mật từ Render
client.login(process.env.DISCORD_TOKEN);
