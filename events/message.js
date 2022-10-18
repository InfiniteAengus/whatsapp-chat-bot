// const client = require('..');
const qrcode = require('qrcode-terminal');

let logs = {};

const steps = [
  {
    Message: `Welcome to Jay WhatsApp Chatbot.
    You are not registered.
    Type "Yes" to register and experience the freedom of making payments on WhatsApp.`,
    Promise: [{ Answer: 'Yes', NextStep: 1 }],
    NextStep: 0,
  },
  {
    Message: `Welcome to Registration. Let's get to know you.
    What's your first name that is written on your ID or Passport?
    
    DO NOT INCLUDE SURNAME`,
    NextStep: 2,
    Key: 'FirstName',
  },
  {
    Message: `What is your surname that appears on your ID or Passport?`,
    NextStep: 3,
    Key: 'SurName',
  },
  {
    Message: `Perfect
    
    Enter your residential address? Example: 13 Sands Street, Sandton, Johannesburg, South Africa
    `,
    NextStep: -1,
    Key: 'Address',
  },
];
module.exports = (client) => {
  client.on('message', (msg) => {
    console.log(msg.id);
    if (msg.fromMe) {
      return;
    }

    if (logs[msg.from] === undefined) {
      logs[msg.from] = { step: 0, answers: {} };
    } else {
      const previousStep = logs[msg.from].step;
      const key = steps[previousStep].Key;
      const promiseStepInd =
        steps[previousStep].Promise?.findIndex(
          (promise) => promise.answer.toLowerCase() === msg.body.toLowerCase()
        ) ?? -1;

      if (key) {
        logs[msg.from].answers[key] = msg.body;
      }

      logs[msg.from].step =
        promiseStepInd === -1
          ? steps[previousStep].NextStep
          : steps[previousStep].Promise[promiseStepInd].NextStep;
    }

    if (logs[msg.from].step === -1) {
      const answers = logs[msg.from].answers;
      msg.reply(
        `Congratulations ${answers['FirstName']}. These  are your details.
        
        Name: ${answers['FirstName']} ${answers['SurName']}
        Address: ${answers['Address']}`
      );
      logs[msg.from] = undefined;
    } else {
      msg.reply(steps[logs[msg.from].step].Message);
    }
  });
};
