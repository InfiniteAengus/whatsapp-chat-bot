const steps = [
  {
    id: 0,
    message: '',
    children: [{ command: 'hello', id: 1 }],
  },
  {
    id: 1,
    message: `Thank you for contacting dianiapp, \n\nWhat can we get for you?\n\n1: Food\n2: Drinks`,
    children: [
      { command: '1', id: 2 },
      { command: '2', id: 3 },
    ],
  },
  {
    id: 2,
    message: `These are the categories we have\n\n1: Swahili Dishes\n2: Fast Foods\n\nWhat would you like?`,
    children: [
      { command: '1', id: 4 },
      { command: '2', id: 5 },
    ],
  },
  {
    id: 3,
    message: `1. Brandy\n2. Wines\n3. Whiskey\n4. Beer\n5. Vodka\n6. Gin\n7. Non-Alcoholic drinks`,
    children: [
      { command: '1', id: 7, value: 'Brandy' },
      { command: '2', id: 7, value: 'Wines' },
      { command: '3', id: 7, value: 'Whiskey' },
      { command: '4', id: 7, value: 'Beer' },
      { command: '5', id: 7, value: 'Vodka' },
      { command: '6', id: 7, value: 'Gin' },
      { command: '7', id: 6 },
    ],
  },
  {
    id: 4,
    message: `Swahili Dishes\nHere is what is available:\n\n1. Pilau\n2. Biriyani\n3. Mbaazi\n4.Maharagwe ya nazi`,
    children: [
      { command: '1', id: 7, value: 'Pilau' },
      { command: '2', id: 7, value: 'Biriyani' },
      { command: '3', id: 7, value: 'Mbaazi' },
      { command: '4', id: 7, value: 'Maharagwe ya nazi' },
    ],
  },
  {
    id: 5,
    message: `Here is what is available:\n\n1. Fries\n2. Chicken\n3. Smokies\n4.Bhajia`,
    children: [
      { command: '1', id: 7, value: 'Fries' },
      { command: '2', id: 7, value: 'Chicken' },
      { command: '3', id: 7, value: 'Smokies' },
      { command: '4', id: 7, value: 'Bhajia' },
    ],
  },
  {
    id: 6,
    message: `Non-alcoholic drinks\n\n1. Sodas\n2. Energy Drinks\n3. Juice`,
    children: [
      { command: '1', id: 7, value: 'Sodas' },
      { command: '2', id: 7, value: 'Energy Drinks' },
      { command: '3', id: 7, value: 'Juice' },
    ],
  },
  {
    id: 7,
    value: 'product',
    message: `How many plates?(1, 2, 3, 4 ..)`,
    children: [{ command: '**number**', id: 8 }],
  },
  {
    id: 8,
    value: 'amount',
    message: `Any comment in regards to your order? (yes, no)`,
    children: [
      { command: 'yes', id: 9 },
      { command: 'no', id: 10 },
    ],
  },
  {
    id: 9,
    message: `Please enter the comment / note below`,
    children: [{ command: '**any**', id: 10 }],
  },
  {
    id: 10,
    value: 'comment',
    message: `Thank you for contacting diani app you,  your order is being processed`,
  },
];

module.exports = steps;
