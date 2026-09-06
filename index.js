const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');
const http = require('http');

// Web server ảo giữ cổng cho Render
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot is running!\n');
});
server.listen(process.env.PORT || 3000);

const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] 
});

const commands = [
    new SlashCommandBuilder()
        .setName('dbio')
        .setDescription('Cập nhật tiểu sử bot')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('Nội dung bio mới')
                .setRequired(true)),

    new SlashCommandBuilder()
        .setName('davt')
        .setDescription('Đổi avatar riêng của bot trong server này')
        .addAttachmentOption(option =>
            option.setName('image')
                .setDescription('Chọn ảnh avatar mới')
                .setRequired(true))
].map(command => command.toJSON());

client.once('ready', async () => {
    console.log(`Dạaaaa bot đã thức giấc: ${client.user.tag}`);
    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
    try {
        await rest.put(
            Routes.applicationCommands(client.user.id),
            { body: commands },
        );
        console.log('Đã đăng ký thành công 2 lệnh /dbio và /davt!');
    } catch (error) {
        console.error(error);
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'dbio') {
        const newBio = interaction.options.getString('text');
        await interaction.reply({ 
            content: `Dạaaaa lệnh /dbio đã nhận nội dung: **${newBio}** rùi nha senpai! 🌸✨`, 
            ephemeral: true 
        });
    } 
    else if (interaction.commandName === 'davt') {
        const imageAttachment = interaction.options.getAttachment('image');
        const imageUrl = imageAttachment.url;
        try {
            // Lấy thông tin bot trong server hiện tại và dùng hàm edit đúng chuẩn
            const botMember = await interaction.guild.members.fetchMe();
            await botMember.edit({ avatar: imageUrl });
            
            await interaction.reply({ 
                content: `Dạaaaa avatar riêng của bot trong server này đã được đổi thành công rùi nè senpai nhaaa! ✨💖`, 
                ephemeral: true 
            });
        } catch (error) {
            console.error(error);
            await interaction.reply({ 
                content: 'Hổng đổi được avatar do lỗi thực thi hoặc thiếu quyền hệ thống gòi senpai ơi! 🥺💔', 
                ephemeral: true 
            });
        }
    }
});

client.login(process.env.DISCORD_TOKEN);
