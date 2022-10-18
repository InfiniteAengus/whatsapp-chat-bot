const fs = require('fs');
const client  = require('..');

module.exports = (client) => {
  fs.readdirSync('./events/')
    .filter((file) => file.endsWith('.js'))
    .forEach((event) => {
      require(`../events/${event}`)(client);
    });
};
