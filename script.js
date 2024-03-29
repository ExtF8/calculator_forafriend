// in this class constructor takes all the inputs for it and all the calculator functions. store the output.
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }
    //calculator functions

    // clear all the different variables
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }
    // clearing a single numb
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    //user clicks -> add to display
    appendNumber(number) {
        if (this.currentOperand.length >= 9) {
            // Limit the input to 9 digits
            return;
        }

        if (number === '.' && this.currentOperand.includes('.')) {
            return;
        }

        this.currentOperand =
            this.currentOperand.toString() + number.toString();
    }

    //determines what happens anytime user clicks any operation Button
    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    //takes values inside calculator -> displays results
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;

            default:
                return;
        }

        // // Truncate the result to 9 digits
        // const truncatedResult = computation.toFixed(9).toString();

        // if (truncatedResult.length > 9) {
        //     this.currentOperand = 'Error';
        // } else {
        //     this.currentOperand = truncatedResult;
        // }

        // Use toExponential to convert the result to scientific notation
        const scientificNotationResult = computation.toExponential();
        this.currentOperand = scientificNotationResult;

        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits) || integerDigits === 0) {
            integerDisplay = '0';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0,
            });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    //updates values inside of the output
    updateDisplay() {
        // // Displays Err on display if result is bigger than 9 digits
        // if (this.currentOperand === 'Error') {
        //     this.currentOperandTextElement.innerText = 'Err';
        //     this.previousOperandTextElement.innerText = '';
        //     return;
        // }

        this.currentOperandTextElement.innerText = this.getDisplayNumber(
            this.currentOperand
        );
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
                this.previousOperand
            )} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}

// this selects  calculator's buttons and operations - classes from html
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector(
    '[data-previous-operand]'
);
const currentOperandTextElement = document.querySelector(
    '[data-current-operand]'
);

const calculator = new Calculator(
    previousOperandTextElement,
    currentOperandTextElement
);

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

// keyboard num pad
document.addEventListener('keydown', function (event) {
    let patternForNumbers = /[0-9]/g;
    let patternForOperators = /[+\-*\/]/g;
    if (event.key.match(patternForNumbers)) {
        event.preventDefault();
        calculator.appendNumber(event.key);
        calculator.updateDisplay();
    }
    if (event.key === '.') {
        event.preventDefault();
        calculator.appendNumber(event.key);
        calculator.updateDisplay();
    }
    if (event.key.match(patternForOperators)) {
        event.preventDefault();
        calculator.chooseOperation(event.key);
        calculator.updateDisplay();
    }
    if (event.key === 'Enter' || event.key === '=') {
        event.preventDefault();
        calculator.compute();
        calculator.updateDisplay();
    }
    if (event.key === 'Backspace') {
        event.preventDefault();
        calculator.clear();
        calculator.updateDisplay();
    }
    if (event.key === 'Delete') {
        event.preventDefault();
        calculator.delete();
        calculator.updateDisplay();
    }
});
