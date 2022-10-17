const client = require('..');

client.on('message', msg => {
  console.log(msg)
})