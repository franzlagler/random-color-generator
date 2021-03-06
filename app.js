// Used NPM Packages
const chalk = require('chalk');
const convert = require('color-convert');

const readline = require('readline-sync');

// Global variables that store input data

const firstInput = process.argv[2];
const secondInput = process.argv[3];

// Function that creates the required line of text
function createTemplateText(color) {
  let templateText = ``;
  // Loop that creates the amount of lines equivalent to the height parameter
  for (let i = 1; i <= 9; i++) {
    if (i === 4 || i === 6) {
      templateText += `${'#'.repeat(5)}${' '.repeat(21)}${'#'.repeat(5)}\n`;
    } else if (i === 5) {
      templateText += `${'#'.repeat(5)}${' '.repeat(7)}${color}${' '.repeat(
        7,
      )}${'#'.repeat(5)}\n`;
    } else {
      templateText += `${'#'.repeat(31)}\n`;
    }
  }

  return templateText;
}

// Function that determines exact color (including saturation and lightness)

function determineColor(color, luminosity) {
  const defaultColorHSL = convert.keyword.hsl(color);
  let hue = 0;
  let lightness = 0;
  const saturation = 100;
  if (!color) {
    hue = Math.floor(Math.random() * 360);
  } else {
    hue = defaultColorHSL[0];
  }

  if (!luminosity) {
    lightness = Math.random() * (90 - 40) + 40;
  } else {
    if (luminosity === 'light') {
      lightness = Math.random() * (90 - 65) + 65;
    } else if (luminosity === 'dark') {
      lightness = Math.random() * (50 - 30) + 30;
    }
  }

  const alteredColorHSL = [hue, saturation, lightness];
  const alteredColorHex = `#${convert.hsl.hex(alteredColorHSL)}`;
  return alteredColorHex;
}

// Checks for entered inputs

// If no own input at all
if (!firstInput) {
  const convertedColor = determineColor();
  console.log(chalk.hex(convertedColor)(createTemplateText(convertedColor)));
}

// If own input equals 'ask'
else if (firstInput === 'ask') {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('What color would you like?\n', (color) => {
    rl.question('What luminosity would you like?\n', (luminosity) => {
      const convertedColor = determineColor(color, luminosity);
      console.log(
        chalk.hex(convertedColor)(createTemplateText(convertedColor)),
      );
      rl.close();
    });
  });
}

// If own color/luminosity input
else {
  if (secondInput) {
    const convertedColor = determineColor(firstInput, secondInput);
    console.log(chalk.hex(convertedColor)(createTemplateText(convertedColor)));
  } else {
    const convertedColor = determineColor(firstInput);
    console.log(chalk.hex(convertedColor)(createTemplateText(convertedColor)));
  }
}
