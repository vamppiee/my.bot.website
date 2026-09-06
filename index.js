const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');

const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] 
});

// 1. Khai báo cấu trúc lệnh Slash Command có cả ô "url" và ô "image"
const command = new SlashCommandBuilder()
    .setName('tuy-chon')
    .setDescription('Lệnh tùy chỉnh đổi thông tin bot có kèm URL và Ảnh!')
    .addStringOption(option =>
        option.setName('url')
            .setDescription('Nhập đường dẫn URL của senpai vào đây')
            .setRequired(true))
    .addImageOption(option =>
        option.setName('image')
            .setDescription('Chọn hoặc tải ảnh lên để làm avatar/hình nền')
            .setRequired(true));

client.once('ready', async () => {
    console.log(`Dạaaaa bot đã thức giấc: ${client.user.tag}`);

    // Đăng ký lệnh lên Discord tự động
    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
    try {
        await rest.put(
            Routes.applicationCommands(client.user.id),
            { body: [command.toJSON()] },
        );
        console.log('Đã đăng ký thành công lệnh tùy chọn có URL và Image cho bot! 🎉');
    } catch (error) {
        console.error(error);
    }
});

// 2. Lắng nghe khi senpai dùng lệnh trong Discord
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'tuy-chon') {
        const urlValue = interaction.options.getString('url');
        const imageAttachment = interaction.options.getAttachment('image');
        const imageUrl = imageAttachment.url;

        try {
            const botMember = interaction.guild.members.me;

            // Thực hiện đổi avatar hoặc xử lý URL tùy theo ý senpai ở đây
            // Ví dụ này sẽ tiến hành đổi avatar riêng của bot trong server bằng tấm ảnh senpai vừa chọn:
            await botMember.edit({ avatar: imageUrl });

            await interaction.reply({ 
                content: `Dạaaaaa! Em đã nhận được:\n🔗 **URL:** ${urlValue}\n🖼️ **Image:** ${imageUrl}\nVà đã cập nhật thành công cho server này rùi nha senpai ơi! 🌸✨`, 
                ephemeral: true 
            });
        } catch (error) {
            console.error(error);
            await interaction.reply({ 
                content: 'Hổng đổi được rồi senpai ơi, kiểm tra lại quyền của bot giúp em nha! 🥺💔', 
                ephemeral: true 
            });
        }
    }
});

client.login(process.env.DISCORD_TOKEN);
