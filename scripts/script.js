let calculator = {};

function handleButtonEvent(event) {
  const button = event.target;
  if (button.classList.contains("number")) {
    concatNumber(button.value);
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

  if (button.classList.contains("dot")) {
    handleDecimalPoint();
  }

  if (button.classList.contains("signal")) {
    calculator.displayValue = toggleSignal();
  }
  updateDisplay();
}

function concatNumber(buttonValue) {
  if (calculator.displayValue === "0") {
    calculator.displayValue = buttonValue;
  } else {
    calculator.displayValue += buttonValue;
  }
}

function handleOperatorButton(buttonValue) {
  if (calculator.firstOperand === null) {
    calculator.firstOperand = Number(calculator.displayValue);
  }

  if (calculator.firstOperand !== null && calculator.secondOperand !== null) {
    calculator.result = calculate(
      calculator.operator,
      calculator.firstOperand,
      calculator.secondOperand
    );
  }
  calculator.operator = buttonValue;
  calculator.displayValue = "0";
}

function handleEqualsButton() {
  calculator.secondOperand = Number(calculator.displayValue);
  calculator.result = calculate(
    calculator.operator,
    calculator.firstOperand,
    calculator.secondOperand
  );
  calculator.displayValue = calculator.result;
}

function handleDecimalPoint() {
  if (!calculator.displayValue.includes(".")) {
    calculator.displayValue += ".";
  }
}

function toggleSignal() {
  if (calculator.displayValue.startsWith("-")) {
    return calculator.displayValue.replace("-", "");
  }

  if (calculator.displayValue === "0") {
    return calculator.displayValue;
  } else {
    return "-" + calculator.displayValue;
  }
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
      if (operand2 === "0") return "LOL";
      result = divide(operand1, operand2);
      break;
    default:
      result = Number(calculator.displayValue);
  }
  return Math.round(result * 100) / 100;
}

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
