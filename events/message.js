// const client = require('..');
const steps = require('../data/config');

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

module.exports = (client) => {
  let currentStep = {};
  client.on('message', async (msg) => {
    const chat = await msg.getChat();
    if (msg.fromMe) {
      return;
    }

    let curUserStep = currentStep[msg.from];
    if (curUserStep === undefined) {
      curUserStep = { step: steps[0], answers: {} };
    }

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

    currentStep[msg.from] = curUserStep;

    if (
      curUserStep.step.children === undefined ||
      curUserStep.step.children.length === 0
    ) {
      chat.sendMessage(
        `You ordered ${curUserStep.answers['amount']} of ${curUserStep.answers['product']}`
      );
      currentStep[msg.from] = undefined;
    }
    chat.sendMessage(curUserStep.step.message);
  });
};
