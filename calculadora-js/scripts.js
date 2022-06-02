const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperationTextElement = document.querySelector("[data-previous-operation]");
const currentOperationTextElement = document.querySelector("[data-current-operation]");

class Calculator {
    constructor (previousOperationTextElement, currentOperationTextElement) {
        this.previousOperationTextElement = previousOperationTextElement;
        this.currentOperationTextElement = currentOperationTextElement;
        this.clear();
    }

    formatDisplayNumber(number){
        const stringNumber = number.toString();

        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1];

        let integerDisplay;

        if (isNaN(integerDigits)) {
            integerDisplay = "";
        } else {
            integerDisplay = integerDigits.toLocaleString("en", {
                maximumfractionDigits: 0,
            });
        }

        if(decimalDigits != null) {
         return `${integerDisplay}.${decimalDigits}`;
        }else {
            return integerDisplay;
        }
    }

    delete(){   
                    // CERTIFICA QUE É UMA STRING E RETIRA O ULTIMO ELEMENTO(SLICE(0,-1)
        this.currentOperation = this.currentOperation.toString().slice(0,-1);
    }

    calculate(){
        let result;
                //"_" PRA MOSTRAR QUE É UM FLOAT
        const _previousOperation = parseFloat(this.previousOperation);
        const _currentOperation = parseFloat(this.currentOperation);

        if(isNaN(_previousOperation) || isNaN(_currentOperation)) return;

            //SWITCH PARA AS OPERAÇOES
        switch (this.operation) {
            case "+":
                result = _previousOperation + _currentOperation;
                break;
            case "-":
                result = _previousOperation - _currentOperation;
                break;
            case "÷":
                result = _previousOperation / _currentOperation;
                break;
            case "*":
                result = _previousOperation * _currentOperation;
                break;
            default:
                return;   
        }

        this.currentOperation = result;
        this.operation = undefined;
        this.previousOperation = "";
    }

    chooseOperation(operation){

        if(this.currentOperation == '') return;
        if(this.previousOperation != ''){
            this.calculate();
        }

        this.operation = operation;

        this.previousOperation = this.currentOperation;
        this.currentOperation = '';
    }

    appendNumber(number) {
        if (this.currentOperation.includes(".") && number === ".") return;
    
        this.currentOperation = `${this.currentOperation}${number.toString()}`;
      }
    
    clear () {
        this.currentOperation = "";
        this.previousOperation = "";
        this.operation = undefined;
    }
        //ATUALIZANDO A TELA;
    updateDisplay() {
        this.previousOperationTextElement.innerText = `${this.formatDisplayNumber(this.previousOperation)} ${this.operation ||''}`;
        this.currentOperationTextElement.innerText = this.formatDisplayNumber(this.currentOperation);

    }
}

const calculator = new Calculator( previousOperationTextElement, currentOperationTextElement);

for (const numberButton of numberButtons) {
    numberButton.addEventListener("click" , () =>{
        calculator.appendNumber(numberButton.innerText);
        calculator.updateDisplay();
    });
}

for (const operationButton of operationButtons){
    operationButton.addEventListener("click", () =>{
        calculator.chooseOperation(operationButton.innerText);
        calculator.updateDisplay();
    });
}

allClearButton.addEventListener("click", () =>{
    calculator.clear();
    calculator.updateDisplay();
});

equalsButton.addEventListener("click", () =>{
    calculator.calculate();
    calculator.updateDisplay();
});

deleteButton.addEventListener("click", () =>{
    calculator.delete();
    calculator.updateDisplay();
});