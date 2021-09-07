// Used NPM Packages
const chalk = require('chalk');
const convert = require('color-convert');


const readline=require('readline');



// Global variables that store input data

const firstInput = process.argv[2]; // Color or Ask
const secondInput = process.argv[3]; // Luminosity

// Function that creates the required line of text
const createTemplateText = (color, width = 31, height = 9) => {

  let templateText = ``;
  // Loop that creates an amount of line equivalent to the height parameter
  for (let i = 1; i <= height; i++) {
    if ((i === 4) || (i === 6)) {
      templateText += `${'#'.repeat(5)}${' '.repeat(21)}${'#'.repeat(5)}\n`;
    } else if (i === 5) {
      templateText += `${'#'.repeat(5)}${' '.repeat(7)}${color}${' '.repeat(7)}${'#'.repeat(5)}\n`;
    } else {
      templateText += `${'#'.repeat(width)}\n`

    }
  }

  return templateText;
}


// Function that determines exact color (including saturation and lightness)

const determineColor = (color, luminosity) => {
  const defaultColorHSL = convert.keyword.hsl(color);
  let hue, lightness;
  const saturation = 100;
  if (color === undefined) {
    hue = Math.floor(Math.random() * 360);
  } else {

    hue = defaultColorHSL[0];
  }


  if (!luminosity) {
    lightness = Math.random() * (80 - 40) + 60;

  } else {
    if (luminosity === 'light') {
      lightness = Math.random() * (90 - 65) + 60;
    } else if (luminosity === 'dark') {
      lightness = Math.random() * (50 - 30) + 30;

    }
  }

  const alteredColorHSL = [hue, saturation, lightness];
  const alteredColorHex = '#' + convert.hsl.hex(alteredColorHSL);
  return alteredColorHex;
}



// Checks for entered inputs (color and luminosity OR ask)

if (!firstInput) {
  const convertedColor = determineColor();
  console.log(chalk.hex(convertedColor)(createTemplateText(convertedColor)));
}

else if(firstInput==='ask'){
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

   rl.question('What color would you like?\n', enteredColor=>{
    rl.question('What luminosity would you like?\n', enteredLuminosity=>{
      const convertedColor = determineColor(enteredColor, enteredLuminosity);
      console.log(chalk.hex(convertedColor)(createTemplateText(convertedColor)));
      rl.close();
    })
  })


}

else {

  if (secondInput) {
    const convertedColor = determineColor(firstInput, secondInput);
    console.log(chalk.hex(convertedColor)(createTemplateText(convertedColor)));
  }

  else {
    const convertedColor = determineColor(firstInput);
    console.log(chalk.hex(convertedColor)(createTemplateText(convertedColor)));
  }

}
