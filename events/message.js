// const client = require('..');
const qrcode = require('qrcode-terminal');
const steps = require('../data/config');

module.exports = (client) => {
  let currentStep = {};

  const findStep = (index) => {
    return steps.find((step) => step.id === index);
  };

  const matchCommand = (command, commandFormat) => {
    if (commandFormat === '**number**') {
      return command === Number(command).toString();
    } else if (commandFormat === '**any**') {
      return true;
    } else {
      return command === commandFormat.toLowerCase();
    }
  };
  client.on('message', (msg) => {
    if (msg.fromMe) {
      return;
    }

    const curUserStep = currentStep[msg.from];
    if (curUserStep === undefined) {
      curUserStep = { step: steps[0], answers: {} };
    } else {
      const command = msg.body.toLowerCase();

      for (let child of curUserStep.step.children) {
        if (matchCommand(command, child.command)) {
          const nextStep = findStep(child.id);
          let answers = curUserStep.answers;
          if (nextStep.value) {
            answers = {
              ...answers,
              [nextStep.value]: child.value ?? command,
            };
          }
          curUserStep = { step: nextStep, answers: answers };
        }
      }
    }
    currentStep[msg.from] = curUserStep;

    if (
      curUserStep.step.children === undefined ||
      curUserStep.step.children.length === 0
    ) {
      client.sendMessage(
        msg.id.id,
        `You ordered ${curUserStep.answers['amount']} of ${curUserStep.answers['product']}`
      );
      currentStep[msg.from] = undefined;
    }
    client.sendMessage(msg.id.id, currentStep.message);
  });
};
