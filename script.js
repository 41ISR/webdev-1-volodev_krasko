document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.button');
    const display = document.querySelector('.display'); 

    let currentExpression = '';

    function updateDisplay(value) {
        display.textContent = value;
    }

    function calculateResult() {
        try {
            let expression = currentExpression
                .replaceAll('×', '*')
                .replaceAll('÷', '/');

            const result = eval(expression);

            if (isNaN(result) || !isFinite(result)) {
                throw new Error('Invalid calculation');
            }

            return parseFloat(result.toFixed(10)).toString();
        } catch (error) {
            return 'Error';
        }
    }

    function handleButtonClick(event) {
        const buttonValue = event.target.textContent;

        // Обработка разных типов кнопок
        switch (buttonValue) {
            case 'AC': 
                currentExpression = '';
                updateDisplay('0');
                break;

            case '=':
                if (currentExpression) {
                    const result = calculateResult();
                    currentExpression = result !== 'Error' ? result : '';
                    updateDisplay(result);
                }
                break;

            case '+/-':
                if (currentExpression) {
                    if ('+-×÷'.includes(currentExpression[currentExpression.length - 1])) {
                        currentExpression += '(-';
                    } else {
                        const result = calculateResult();
                        if (result !== 'Error') {
                            currentExpression = result.startsWith('-') ? result.slice(1) : '-' + result;
                            updateDisplay(currentExpression);
                        }
                    }
                } else {
                    currentExpression = '-';
                    updateDisplay(currentExpression);
                }
                break;

            case '%':
                if (currentExpression) {
                    const parts = currentExpression.split('%');

                    if (parts.length === 1) {
                        const value = parseFloat(calculateResult());
                        currentExpression = (value / 100).toString();
                        updateDisplay(currentExpression);
                    } else {
                        const value = parseFloat(parts[0]) || 0;
                        const percent = parseFloat(parts[1]) || 0;
                        currentExpression = ((value / 100) * percent).toString();
                        updateDisplay(currentExpression);
                    }
                }
                break;

            default:
                if (display.textContent === '0' || display.textContent === 'Error') {
                    currentExpression = buttonValue;
                } else {
                    currentExpression += buttonValue;
                }

                updateDisplay(currentExpression);
                break;
        }
    }

    buttons.forEach(button => {
        button.addEventListener('click', handleButtonClick);
    });
});
