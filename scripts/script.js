let calculator = {};

const resetCalculator = () => {
  calculator = {
    displayValue: "0",
    operator: null,
    firstOperand: null,
    secondOperand: null,
    result: 0,
  };
};
const updateDisplay = () => (display.textContent = calculator.displayValue);

function handleButtonEvent(event) {
  const button = event.target;
  if (button.classList.contains("number")) {
    handleNumberButton(button.value);
  }

  if (button.classList.contains("operator")) {
    handleOperatorButton(button.value);
  }

  if (button.classList.contains("equalsSign")) {
    handleEqualsButton();
  }

  if (button.classList.contains("clear")) {
    resetCalculator();
  }
  updateDisplay();
}

function handleNumberButton(buttonValue) {
  if (calculator.displayValue === "0") {
    calculator.displayValue = buttonValue;
  } else {
    calculator.displayValue += buttonValue;
  }
}

function handleOperatorButton(buttonValue) {
  calculator.operator = buttonValue;
  calculator.firstOperand = parseInt(calculator.displayValue);
  calculator.displayValue = "0";
}

function handleEqualsButton() {
  calculator.secondOperand = parseInt(calculator.displayValue);
  calculator.result = calculate(
    calculator.operator,
    calculator.firstOperand,
    calculator.secondOperand
  );
  calculator.displayValue = calculator.result;
}

const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;

function calculate(operator, operand1, operand2) {
  let result = 0;
  switch (operator) {
    case "+":
      result = add(operand1, operand2);
      break;
    case "-":
      result = subtract(operand1, operand2);
      break;
    case "*":
      result = multiply(operand1, operand2);
      break;
    case "/":
      result = divide(operand1, operand2);
      break;
    default:
      result = calculator.displayValue;
  }
  return result;
}

// DOM
const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

// Listeners
buttons.forEach((button) => {
  button.addEventListener("click", handleButtonEvent);
});

// Initial values
resetCalculator();
display.textContent = calculator.displayValue;
