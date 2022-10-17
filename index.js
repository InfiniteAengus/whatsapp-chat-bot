const { Client } = require('whatsapp-web.js');

const client = new Client();

module.exports = client;

['event'].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
})

client.initialize()