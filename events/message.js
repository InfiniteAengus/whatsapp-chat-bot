// const client = require('..');
const qrcode = require('qrcode-terminal');

module.exports = (client) => {
  client.on('qr', (qr) => {
    console.log('qr');
    qrcode.generate(qr, { small: true });
  });

  client.on('authenticated', () => {
    console.log('AUTHENTICATED');
  });

  client.on('ready', () => {
    console.log('Client is ready!');
  });

  client.on('message', (msg) => {
    console.log(msg);
  });
};
