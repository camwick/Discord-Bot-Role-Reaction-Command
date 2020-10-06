const Discord = require('discord.js');
const client = new Discord.Client({ partials: ["MESSAGE", 'CHANNEL', 'REACTION']});
const TOKEN = require('./config.json')

const PREFIX = '!';

client.on('ready', () => {
    console.log('Bot is online');
})

client.on('message', async message => {
    if (!message.content.startsWith(PREFIX)) return;
    
    // splitting up the prefix and the command
    const args = message.content.slice(PREFIX.length).split(/ +/);
    const command = args.shift().toLowerCase();

    // sends an Embeded message that allows for role assignment via reactions
    if (command === 'roles')
    {
        let embed = new Discord.MessageEmbed()
        .setTitle('Reaction Roles')
        .setDescription(':robot_face: - Discord Bot\n' + 
        ':desktop: - Website\n' + 
        ':video_game: - Game')
        .setColor('BLUE')
        let msgEmbed = await message.channel.send(embed)
        msgEmbed.react('🤖')
        msgEmbed.react('🖥️')
        msgEmbed.react('🎮')
    }
})

// handling added reactions
client.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch;

    if(user.bot) return;
    if(!reaction.message.guild) return;

    if (reaction.emoji.name === '🤖')
    {
        await reaction.message.guild.members.cache.get(user.id).roles.add('762734541344342056')
    }
    if (reaction.emoji.name === '🖥️')
    {
        await reaction.message.guild.members.cache.get(user.id).roles.add('762821113709330443')
    }
    if (reaction.emoji.name === '🎮')
    {
        await reaction.message.guild.members.cache.get(user.id).roles.add('762821150186274842')
    }
    
})

// handling removed reactions
client.on('messageReactionRemove', async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch;

    if(user.bot) return;
    if(!reaction.message.guild) return;

    if (reaction.emoji.name === '🤖')
    {
        await reaction.message.guild.members.cache.get(user.id).roles.remove('762734541344342056')
    }
    if (reaction.emoji.name === '🖥️')
    {
        await reaction.message.guild.members.cache.get(user.id).roles.remove('762821113709330443')
    }
    if (reaction.emoji.name === '🎮')
    {
        await reaction.message.guild.members.cache.get(user.id).roles.remove('762821150186274842')
    }
})

client.login(TOKEN.token)