// const client = require('..');
const qrcode = require('qrcode-terminal');

module.exports = (client) => {
  client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
  });

  client.on('authenticated', () => {
    console.log('AUTHENTICATED');
  });

  client.on('ready', () => {
    console.log('Client is ready!');
  });

  client.on('auth_failure', (msg) => {
    console.log('Auth fail ', msg);
    client.initialize();
  });
};
