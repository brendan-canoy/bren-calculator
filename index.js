const calculator = {
    displayVal: '0',
    operandOne: null,
    pendingOperand: false,
    operator: null,
};

// Dispaly digits on screen
function inputNum(num){
    const { displayVal, pendingOperand } = calculator;

    // If has pendingOperand, displayVal will be overwritten by clicked button
    // Otherwise append
    if(pendingOperand === true){
        calculator.displayVal = num;
        calculator.pendingOperand = false;
    }else{
        //overwrite if displayVal=0 otherwise append
        calculator.displayVal = displayVal === '0' ? num : displayVal + num;
    }
}

//Display decimal with error handle
function decimal(dot){
    //Fix decimal bug
    if (calculator.pendingOperand === true) {
        calculator.displayVal = "0."
        calculator.pendingOperand = false;
        return
    }
    if (!calculator.displayVal.includes(dot)){
        calculator.displayVal += dot;
    }
}

//Next operator catcher
function operatorHandle(nextOperator) {
    //Destructure properties
    const {operandOne, displayVal, operator} = calculator
    const inputVal = parseFloat(displayVal);

    //If operator is existing and pending operand is true then no more additional operator clicks
    if(operator && calculator.pendingOperand){
        calculator.operator = nextOperator;
        return;
    }
    //Update operandOne
    if (operandOne == null && !isNaN(inputVal)){
        calculator.operandOne = inputVal;
    }
    //If operator is selected, invoke calculate function and result save
    else if(operator){
        const result = calculate(operandOne, inputVal, operator);
        //ayaw gumana ng dollar sign
        calculator.displayVal = `${parseFloat(result.toFixed(7))}`;
        calculator.operandOne = result;
    }
    calculator.pendingOperand = true;
    calculator.operator = nextOperator;
    
}

//Operation Execute
function calculate(operandOne, operandtwo, operator){
    if (operator === '+'){
        return operandOne + operandtwo;
    }
        else if (operator === '-') {
            return operandOne - operandtwo;
        }
        else if (operator === '*') {
            return operandOne * operandtwo;
        }
        else if (operator === '/') {
            return operandOne / operandtwo;
        }

        return operandtwo;
}

// Clear Calculator
function clearCalculator() {
    calculator.displayVal = '0';
    calculator.operandOne = null;
    calculator.pendingOperand = false;
    calculator.operator = null;
}

// Update Display
function update() {
    const display = document.querySelector('.display');
    display.value = calculator.displayVal;
}

// everytime na mag input new digits update
update();

const keys = document.querySelector('.calculator-buttons');
keys.addEventListener('click', event => {
    const { target } = event;
    const { value } = target;
    if(!target.matches('button')) {
        return;
    }

    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
         operatorHandle(value);
         break;
        case '.':
            decimal(value);
            break;
        case 'all-clear':
            clearCalculator();
            break;
        default:
            //To determine if integer ba talaga 
            if (Number.isInteger(parseFloat(value))) {
                inputNum(value);
            }    
    }
//Reset when there is another value
    update();
});