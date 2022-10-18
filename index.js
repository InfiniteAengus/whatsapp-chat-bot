const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
  authStrategy: new LocalAuth(),
});

// module.exports = client;

['event'].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

client.initialize();

module.exports = client;
