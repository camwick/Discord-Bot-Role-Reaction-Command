const Discord = require('discord.js');
const client = new Discord.Client({ partials: ["MESSAGE", 'CHANNEL', 'REACTION']});

// saved my bot key in a json file on my pc so that I could upload share this file
const TOKEN = require('./config.json')

// prefix to distinguish commands
const PREFIX = '!';

// ensures bot got online by logging it in console
client.on('ready', () => {
    console.log('Bot is online');
})

// handles commands
client.on('message', async message => {
    if (!message.content.startsWith(PREFIX)) return;
    
    // splitting up the prefix and the command
    const args = message.content.slice(PREFIX.length).split(/ +/);
    const command = args.shift().toLowerCase();

    // roles command
    // sends an Embeded message that allows for role assignment via reactions
    if (command === 'roles')
    {
        // creating embedded message
        let embed = new Discord.MessageEmbed()
        .setTitle('Reaction Roles')
        .setDescription(':robot_face: - Discord Bot\n' + 
        ':desktop: - Website\n' + 
        ':video_game: - Game')
        .setColor('BLUE')
        let msgEmbed = await message.channel.send(embed)
        
        // adding the reactions to the embed
        msgEmbed.react('🤖')
        msgEmbed.react('🖥️')
        msgEmbed.react('🎮')
    }
})

// handling added reactions
client.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch;

    // making sure reaction isn't by the bot
    if(user.bot) return;
   

    // assigning role based off reaction choice
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

    // making sure reaction isn't by the bot
    if(user.bot) return;

    // removing role when reaction is removed
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