const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');

const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] 
});

// 1. Khai báo 2 lệnh /dbio và /davt riêng biệt
const commands = [
    new SlashCommandBuilder()
        .setName('dbio')
        .setDescription('Đổi bio (tiểu sử) riêng cho bot trong server này')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('Nhập nội dung bio mới')
                .setRequired(true)),

    new SlashCommandBuilder()
        .setName('davt')
        .setDescription('Đổi avatar (ảnh đại diện) riêng cho bot trong server này')
        .addImageOption(option =>
            option.setName('image')
                .setDescription('Chọn hoặc tải ảnh lên làm avatar mới')
                .setRequired(true))
].map(command => command.toJSON());

client.once('ready', async () => {
    console.log(`Dạaaaa bot đã thức giấc: ${client.user.tag}`);

    // Tự động đăng ký 2 lệnh lên Discord
    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
    try {
        await rest.put(
            Routes.applicationCommands(client.user.id),
            { body: commands },
        );
        console.log('Đã đăng ký thành công 2 lệnh /dbio và /davt cho bot! 🎉');
    } catch (error) {
        console.error(error);
    }
});

// 2. Lắng nghe khi dùng lệnh trong Discord
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const botMember = interaction.guild.members.me;

    // Xử lý lệnh /dbio
    if (interaction.commandName === 'dbio') {
        const newBio = interaction.options.getString('text');
        try {
            await botMember.edit({ bio: newBio });
            await interaction.reply({ 
                content: `Dạaaaa bio riêng cho server này đã được đổi thành: **${newBio}** rùi nha senpai ơi! 🌸✨`, 
                ephemeral: true 
            });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Hổng đổi được bio gòi senpai ơi, kiểm tra lại quyền của bot giúp em nha! 🥺💔', ephemeral: true });
        }
    } 
    
    // Xử lý lệnh /davt
    else if (interaction.commandName === 'davt') {
        const imageAttachment = interaction.options.getAttachment('image');
        const imageUrl = imageAttachment.url;
        try {
            await botMember.edit({ avatar: imageUrl });
            await interaction.reply({ 
                content: `Dạaaaa avatar riêng của server này đã được lột xác xinh xẻo rùi nè senpai nhaaa! ✨💖`, 
                ephemeral: true 
            });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Có lỗi khi đổi avatar rồi senpai ơi! 🥺💔', ephemeral: true });
        }
    }
});

client.login(process.env.DISCORD_TOKEN);
