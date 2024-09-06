let calculator = {
  displayValue: "0",
  operator: null,
  firstOperand: 0,
  secondOperand: 0,
  result: 0,
};

const updateDisplay = () => (display.textContent = calculator.displayValue);

function handleButtonEvent(event) {
  const button = event.target;
  const buttonValue = event.target.value;

  if (button.classList.contains("number")) {
    if (calculator.displayValue === "0") {
      calculator.displayValue = buttonValue;
    } else {
      calculator.displayValue += buttonValue;
    }
    updateDisplay();
  }

  if (button.classList.contains("operator")) {
    calculator.operator = buttonValue;
    calculator.firstOperand = parseInt(calculator.displayValue);
    calculator.displayValue = "0";
    updateDisplay();
  }

  if (button.classList.contains("equalsSign")) {
    calculator.secondOperand = parseInt(calculator.displayValue);
    calculator.result = calculate(
      calculator.operator,
      calculator.firstOperand,
      calculator.secondOperand
    );

    calculator.displayValue = calculator.result;
    updateDisplay();
  }

  if (button.classList.contains("clear")) {
    calculator = {
      displayValue: "0",
      operator: null,
      firstOperand: 0,
      secondOperand: 0,
      result: 0,
    };
    updateDisplay();
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
      result = divide(operand1, operand2);
      break;
    default:
      result = calculator.displayValue;
  }
  return result;
}

const display = document.querySelector(".display");
display.textContent = calculator.displayValue;

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", handleButtonEvent);
});
