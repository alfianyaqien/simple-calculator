// the first step is we make an object

/* object that representing 
 the property of calculator */

// make calculator object
const calculator = {
    displayNumber: '0',
    firstNumber: null,
    operator: null,
    waitingForSecondNumber: false,
}

// function update calculator display
function updateDisplay() {
    document.querySelector('#displayNumber').innerHTML = calculator.displayNumber;
}

// function clear calculator
function clearCalculator() {
    calculator.displayNumber = '0';
    calculator.firstNumber = null;
    calculator.operator = null;
    calculator.waitingForSecondNumber = false;
}

// function input digit number
function inputDigit(digit) {
    if (calculator.displayNumber === '0') {
        calculator.displayNumber = digit;
    } else {
        calculator.displayNumber += digit;
    }
}

// get buttons element
const buttons = document.querySelectorAll('.button');

// loop the button and addEventListener
for (let button of buttons) {

    // eventListener when button is clicked
    button.addEventListener('click', function(event) {
        // get clicked element object
        const target = event.target;

        if (target.classList.contains('clear')) {
            clearCalculator();
            updateDisplay();
            return;
        }

        if (target.classList.contains('negative')) {
            inverseNumber();
            updateDisplay();
            return;
        }

        if (target.classList.contains('equals')) {
            performCalculation();
            updateDisplay();
            return;
        }

        if (target.classList.contains('operator')) {
            handleOperator(target.innerText);
            return;
        }

        inputDigit(target.innerText);
        updateDisplay();
    });
}

// function inverse number
function inverseNumber() {
    if (calculator.displayNumber === '0') {
        return;
    }
    calculator.displayNumber = calculator.displayNumber * -1;
}

// function operator
function handleOperator(operator) {
    if (!calculator.waitingForSecondNumber) {
        calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;

        // reset the displat number
        calculator.displayNumber = '0';
    } else {
        alert('Operator sudah diterapkan!');
    }
}

// function calculation
function performCalculation() {
    if (calculator.firstNumber == null || calculator.operator == null) {
        alert('Anda belum menetapkan operator!');
        return;
    }

    let result = 0;
    if (calculator.operator === '+') {
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
    } else {
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
    }

    const history = {
        firstNumber: calculator.firstNumber,
        secondNumber: calculator.displayNumber,
        operator: calculator.operator,
        result: result,
    }

    putHistory(history);
    calculator.displayNumber = result;
    renderHistory();
}