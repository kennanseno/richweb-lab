var inputVal = [];
var cleanValArray = false;
const createButton = (text) => {
  const button = document.createElement('button');
  button.innerHTML = text;
  button.style.cssText = 'font-size: 1.1em; border-radius: 5px; width: 50px; text-align: center; padding: .5em; font-size: 1em; flex-grow: 1; margin: 0 5px 5px 0;';
  //Add clickListener on each buttons and change display values when a button is clicked
  button.addEventListener("click", function() {
    var key = document.getElementsByTagName("input")[0];
    var test = '';
    
    if(text == 'C') {
      key.value = '';
      inputVal = [];
    }else if(text == '=') {
      var val = key.value;

      for (var i = 0; i < inputVal.length; i++) {
       inputVal[i] = inputVal[i].replace(/x/g, '*').replace(/÷/g, '/');
        test += inputVal[i];
      }

      key.value = eval(test);
      cleanValArray = true;
    }else {
      //cleanup if new calculation
      if(cleanValArray) {
        inputVal = [];
        cleanValArray = false;
        key.value = '';
      }
      
      inputVal.push(text);
      console.log(inputVal);
      key.value += text; 
    }
  });
  return button;
}

const createDisplay = () => {
  const input = document.createElement('input');
  input.type = 'text';
  input.disabled = true;
  input.placeholder = '0';
  input.style.cssText = 'font-size: 2em; text-align: right; border-radius: 5px; width: 240px; height: 35px; margin-bottom: 10px; padding: 1%;';
  return input;
}

const createKeypad = () => {
  const symbols = [
    '(', ')', '±', '÷',
    '7', '8', '9', 'x',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', 'C', '='
  ];
  const keypad = document.createElement('section');
  for (let s of symbols) {
    keypad.appendChild(createButton(s));
  }
  keypad.style.cssText = 'display: inline-flex; flex-flow: row wrap; justify-content: space-between;';
  return keypad;
}

const createCalculator = () => {
  const calculator = document.createElement('section');
  calculator.style.cssText = 'width: 250px; font-size: 100%; border: 1px solid black; padding: 10px; border-radius: 7px; margin-left: auto; margin-right: auto; font-family: Verdana;';
  calculator.appendChild(createDisplay());
  calculator.appendChild(createKeypad());
  return calculator;
}

document.body.appendChild(createCalculator());