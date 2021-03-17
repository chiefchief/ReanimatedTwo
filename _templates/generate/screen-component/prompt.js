module.exports = [
  {
    type: 'input',
    name: 'name',
    message: 'Enter component name...',
  },
  {
    type: 'select',
    name: 'folder',
    message: 'Select screen folder...',
    choices: [
      'Start',
      'ColorSelection',
      'LongPress',
      'SwipeButton',
      'Breathe',
      'DragAndDrop',
      //ADD MORE SCREENS
    ],
  },
];
