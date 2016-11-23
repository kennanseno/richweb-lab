import {Observable} from 'rxjs/Rx';

let calculator = {value: ''};
const calcDisplay = document.getElementById('display');
const equalButton = document.getElementById('=');
      const equal = acc => ( {value: acc.value + '='} );
const clearButton = document.getElementById('C');
      const clear = acc => ( {value: ''} );
const openBracketButton = document.getElementById('(');
      const bracketOpen = acc => ( {value: acc.value + '('} );
const closeBracketButton = document.getElementById(')');
      const bracketClose = acc => ( {value: acc.value + ')'} );
const decimalButton = document.getElementById('.');
      const addDecimal = acc => ( {value: acc.value + '.'} );
const addButton = document.getElementById('+');
      const add = acc => ( {value: acc.value + '+'} );
const subtractButton = document.getElementById('-');
      const subtract = acc => ( {value: acc.value + '-'} );
const multiplyButton = document.getElementById('x');
      const multiply = acc => ( {value: acc.value + 'x'} );
const divideButton = document.getElementById('÷');
      const divide = acc => ( {value: acc.value + '÷'} );
const oneButton = document.getElementById('1');
      const one = acc => ( {value: acc.value + '1'} );
const twoButton = document.getElementById('2');
      const two = acc => ( {value: acc.value + '2'} );
const threeButton = document.getElementById('3');
      const three = acc => ( {value: acc.value + '3'} );
const fourButton = document.getElementById('4');
      const four = acc => ( {value: acc.value + '4'} );
const fiveButton = document.getElementById('5');
      const five = acc => ( {value: acc.value + '5'} );
const sixButton = document.getElementById('6');
      const six = acc => ( {value: acc.value + '6'} );
const sevenButton = document.getElementById('7');
      const seven = acc => ( {value: acc.value + '7'} );
const eightButton = document.getElementById('8');
      const eight = acc => ( {value: acc.value + '8'} );
const nineButton = document.getElementById('9');
      const nine = acc => ( {value: acc.value + '9'} );
const zeroButton = document.getElementById('0');
      const zero = acc => ( {value: acc.value + '0'} );

const keyPressed = Observable.fromEvent(document, 'keyup')
    .filter(function(e) {
          var keyButtons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '=', 'x', '-', '÷'];
          keyButtons.forEach(function(value){
                if(value == e.key) {
                      return e.type + (e.key || e.which); 
                }
          });
          
      });

keyPressed.subscribe(function(e) {
    console.log(e.type, e.key);
});

const button$ = Observable.merge(
  Observable.fromEvent(equalButton, 'click').mapTo(equal),
  Observable.fromEvent(clearButton, 'click').mapTo(clear),
  Observable.fromEvent(openBracketButton, 'click').mapTo(bracketOpen),
  Observable.fromEvent(closeBracketButton, 'click').mapTo(bracketClose),
  Observable.fromEvent(decimalButton, 'click').mapTo(addDecimal),
  Observable.fromEvent(addButton, 'click').mapTo(add),
  Observable.fromEvent(subtractButton, 'click').mapTo(subtract),
  Observable.fromEvent(multiplyButton, 'click').mapTo(multiply),
  Observable.fromEvent(divideButton, 'click').mapTo(divide),
  Observable.fromEvent(oneButton, 'click').mapTo(one),
  Observable.fromEvent(twoButton, 'click').mapTo(two),
  Observable.fromEvent(threeButton, 'click').mapTo(three),
  Observable.fromEvent(fourButton, 'click').mapTo(four),
  Observable.fromEvent(fiveButton, 'click').mapTo(five),
  Observable.fromEvent(sixButton, 'click').mapTo(six),
  Observable.fromEvent(sevenButton, 'click').mapTo(seven),
  Observable.fromEvent(eightButton, 'click').mapTo(eight),
  Observable.fromEvent(nineButton, 'click').mapTo(nine),
  Observable.fromEvent(zeroButton, 'click').mapTo(zero)
)

button$
  .scan((acc, update) => update(acc), calculator)
  .subscribe(calculator => {
      calcDisplay.value = calculator.value;

      if(calculator.value.charAt(calculator.value.length - 1) == '=') {
        var result = modifyOperationCharacters(calculator.value);
        calcDisplay.value = eval(result);
      }
  });

/**
 * Function to replace/remove some numerical operation characters for eval() to work.
 * Multiply ( x >>>>> * )
 * Divide ( ÷ >>>>> / )
 * Remove equal sign ( = )
 */
var modifyOperationCharacters = function (value) {
  var result = '';
  for (var i = 0; i < value.length - 1; i++) {
    result += value.charAt(i).replace(/x/g, '*').replace(/÷/g, '/');
  }
  return result;
}