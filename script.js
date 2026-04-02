let display = document.getElementById('display');
        let currentInput = '0';
        let operator = null;
        let previousInput = null;
        let waitingForOperand = false;

        function updateDisplay() {
            display.value = currentInput;
        }

        function inputNumber(num) {
            if (waitingForOperand) {
                currentInput = num;
                waitingForOperand = false;
            } else {
                currentInput = currentInput === '0' ? num : currentInput + num;
            }
            updateDisplay();
        }

        function inputDecimal() {
            if (waitingForOperand) {
                currentInput = '0.';
                waitingForOperand = false;
            } else if (currentInput.indexOf('.') === -1) {
                currentInput += '.';
            }
            updateDisplay();
        }

        function inputOperator(nextOperator) {
            const inputValue = parseFloat(currentInput);

            if (previousInput === null) {
                previousInput = inputValue;
            } else if (operator) {
                const currentValue = previousInput || 0;
                const newValue = performCalculation(currentValue, inputValue, operator);

                currentInput = String(newValue);
                previousInput = newValue;
                updateDisplay();
            }

            waitingForOperand = true;
            operator = nextOperator;
        }

        function calculate() {
            const inputValue = parseFloat(currentInput);

            if (previousInput !== null && operator) {
                const newValue = performCalculation(previousInput, inputValue, operator);
                
                currentInput = String(newValue);
                previousInput = null;
                operator = null;
                waitingForOperand = true;
                updateDisplay();
            }
        }

        function performCalculation(firstOperand, secondOperand, operator) {
            switch (operator) {
                case '+':
                    return firstOperand + secondOperand;
                case '-':
                    return firstOperand - secondOperand;
                case '*':
                    return firstOperand * secondOperand;
                case '/':
                    if (secondOperand === 0) {
                        alert('Cannot divide by zero!');
                        return firstOperand;
                    }
                    return firstOperand / secondOperand;
                default:
                    return secondOperand;
            }
        }

        function clearDisplay() {
            currentInput = '0';
            operator = null;
            previousInput = null;
            waitingForOperand = false;
            updateDisplay();
        }

        function clearEntry() {
            currentInput = '0';
            updateDisplay();
        }

        function backspace() {
            if (currentInput.length > 1) {
                currentInput = currentInput.slice(0, -1);
            } else {
                currentInput = '0';
            }
            updateDisplay();
        }

        // Keyboard support
        document.addEventListener('keydown', function(event) {
            const key = event.key;
            
            if (key >= '0' && key <= '9') {
                inputNumber(key);
            } else if (key === '.') {
                inputDecimal();
            } else if (key === '+' || key === '-') {
                inputOperator(key);
            } else if (key === '*') {
                inputOperator('*');
            } else if (key === '/') {
                event.preventDefault();
                inputOperator('/');
            } else if (key === 'Enter' || key === '=') {
                event.preventDefault();
                calculate();
            } else if (key === 'Escape' || key === 'c' || key === 'C') {
                clearDisplay();
            } else if (key === 'Backspace') {
                event.preventDefault();
                backspace();
            }
        });
    