
// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const { Client, Events, GatewayIntentBits, Collection, MessageFlags, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');
const handleResp = require('./handler.js');
const axios = require('axios');
// Create a new client instance

//If running on fargate
const dotenv = require('dotenv');
dotenv.config();

if (process.env.ENV_FILE) {
  const parsed = dotenv.parse(process.env.ENV_FILE);
  for (const k in parsed) {
    process.env[k] = parsed[k];
  }
}


const TOKEN = process.env.TOKEN;
const UNSPLASH_KEY = process.env.UNSPLASH_KEY;


const client = new Client({ intents: 
  [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
client.commands = new Collection();
client.login(TOKEN);
client.once(Events.ClientReady, (readyClient)=> {
console.log(`Ready! Logged in as ${readyClient.user.tag}`);
  let nchannel = client.channels.cache.get("1439252422336970934");
  let mchannel = client.channels.cache.get("1425339230439084114");
    nchannel.send("I am the bluest moon in the moonland :)");
    mchannel.send("Blue Moon just fell in!");
});

async function searchUnsplash(query){
  const url = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&client_id=${UNSPLASH_KEY}`;
  try {
    const res = await axios.get(url);
    return res.data.urls.full //image 
  }catch (err){
    console.error(err);
    return null;
  }
}

const data = fs.readFileSync('./responses.json','utf8');
let obj = {};
 obj = JSON.parse(data);

client.on('messageCreate', async message => {
   
  if(message.author.bot) return;

  const keys = Object.keys(obj);
  const keyMatch = keys.find(key => message.content.toLowerCase().includes(key.toLowerCase()));
  
  if(keyMatch){
  message.channel.send(obj[keyMatch]);
  }
  if(message.content.toLowerCase().startsWith(".i")){
    const query = message.content.slice(3).trim();
    if(!query) return message.channel.send('Unable to get query');

  const imageUrl = await searchUnsplash(query);

    if(!imageUrl){
      message.channel.send("There are no images");
    } else {
      const embed = new EmbedBuilder()
        .setTitle(`Image result for: ${query}`)
        .setImage(imageUrl)
      .setColor(0x00FFF0);
      message.channel.send({ embeds: [embed] });
    }
  }
     

  if(message.content.toLowerCase() === "etwaes history"){
  const embed = new EmbedBuilder()
    .setTitle("Hello")
    .setDescription("I love coding! Thank you for considering for this intiterview")
    .setColor(0x0053AF)
    .setFields({ name: "0.", value: "HISTORY OF ETWAES"},
      { name: "1.", value: "Prologue", inline:true}
    );

    const pages = [
            new EmbedBuilder().setTitle("Page 1").setDescription("Toxicical Etwaes is a legacy server. Which seeds its root beyond its own conception.").setColor(0x00FF00),
            new EmbedBuilder().setTitle("Page 2").setDescription("Though in its current version, the High Numbers next to the server name enumerate its current version.\nIts chaotic birth begins with the Unnumbered epoch\n dating back to peak covid time period of 2020's\n").setColor(0x0099FF),
            
    ];
    let current = 0;
    //ButtonBuilder
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('click_me').setLabel('Next ->').setStyle(ButtonStyle.Primary),
      new ButtonBuilder().setCustomId('unclick_me').setLabel('<-Prev').setStyle(ButtonStyle.Primary)
      );
    
    const msg = await message.channel.send({ embeds: [pages[current]], components: [row] });
    
    const collector = msg.createMessageComponentCollector({ componentType: ComponentType.Button });

    collector.on('collect', i =>{
      if (i.customId === 'click_me'){
        current = current + 1 < pages.length ? current + 1 : 0;
      } else if (i.customId === 'unclick_me'){
        current = current -1 >= 0 ? current -1 :pages.length -1;
      }
      i.update({ embeds: [pages[current]], components: [row]});
    });
  }
});

/*
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for(const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter( 
    file=> file.endsWith('.js'));
	for(const file of commandFiles) {
		const filePath =path.join(commandsPath, file);
		const command = require(filePath);
//set new item in collection with key as command
		if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
		}else{
			console.log(`[WARNING] command at 
${filePath} is missing data or execute property.`);
		}}}

/*
client.on(Events.InteractionCreate, async interaction => {
  console.log("Bot is on...");
if (!interaction.isChatInputCommand()) return;
	console.log(interaction);
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: `There was an error while executing this command!`, flags: MessageFlags.Ephemeral });
		} else {
			await interaction.reply({ content: `There was an error while executing 
        this command!`, flags: MessageFlags.Ephemeral });
		}
	}
}); */ 






