// Function to perform calculation
function calculate() {
    // Get input values
    let num1 = parseFloat(document.getElementById('num1').value);
    let num2 = parseFloat(document.getElementById('num2').value);
    let operation = document.getElementById('operation').value;
    let resultDiv = document.getElementById('result');
    let errorDiv = document.getElementById('error-message');
    
    // Clear previous error
    errorDiv.innerHTML = '';
    
    // Validate input - Check if numbers are valid
    if (isNaN(num1) || isNaN(num2)) {
        errorDiv.innerHTML = '⚠️ Please enter valid numbers in both fields!';
        resultDiv.innerHTML = 'Invalid Input';
        resultDiv.style.backgroundColor = '#f8d7da';
        resultDiv.style.color = '#721c24';
        return;
    }
    
    let result;
    let isValid = true;
    
    // Perform calculation based on operation
    switch(operation) {
        case 'add':
            result = num1 + num2;
            break;
            
        case 'subtract':
            result = num1 - num2;
            break;
            
        case 'multiply':
            result = num1 * num2;
            break;
            
        case 'divide':
            // Check for division by zero
            if (num2 === 0) {
                errorDiv.innerHTML = '❌ Error: Cannot divide by zero!';
                resultDiv.innerHTML = 'Division Error';
                resultDiv.style.backgroundColor = '#f8d7da';
                resultDiv.style.color = '#721c24';
                isValid = false;
            } else {
                result = num1 / num2;
            }
            break;
            
        default:
            result = 'Invalid Operation';
            isValid = false;
    }
    
    // Display result if valid
    if (isValid && result !== undefined) {
        displayResult(result);
    }
}

// Function to display result with color coding (BONUS)
function displayResult(result) {
    let resultDiv = document.getElementById('result');
    
    // Format result - handle decimal places
    let formattedResult;
    if (Number.isInteger(result)) {
        formattedResult = result;
    } else {
        formattedResult = result.toFixed(4); // Show 4 decimal places
    }
    
    // Display result
    resultDiv.innerHTML = `Result: ${formattedResult}`;
    
    // BONUS: Change background color based on positive/negative value
    if (result > 0) {
        resultDiv.style.backgroundColor = '#d4edda'; // Green for positive
        resultDiv.style.color = '#155724';
        resultDiv.style.border = '2px solid #c3e6cb';
    } else if (result < 0) {
        resultDiv.style.backgroundColor = '#fff3cd'; // Yellow for negative
        resultDiv.style.color = '#856404';
        resultDiv.style.border = '2px solid #ffeeba';
    } else {
        resultDiv.style.backgroundColor = '#cce5ff'; // Blue for zero
        resultDiv.style.color = '#004085';
        resultDiv.style.border = '2px solid #b8daff';
    }
    
    // Log calculation for demonstration (using typeof)
    console.log('Calculation performed:');
    console.log('Result:', result);
    console.log('Type of result:', typeof result);
    console.log('Is positive?', result > 0);
    console.log('Is negative?', result < 0);
    console.log('Is zero?', result === 0);
}

// Bonus: Add keyboard support (press Enter to calculate)
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        calculate();
    }
});

// Initialize calculator
window.onload = function() {
    console.log('Calculator initialized');
    console.log('Browser Info:', navigator.userAgent);
    console.log('Window Size:', window.innerWidth, 'x', window.innerHeight);
    
    // Set placeholder values for demonstration
    document.getElementById('num1').placeholder = 'e.g., 10';
    document.getElementById('num2').placeholder = 'e.g., 5';
};

// Function to clear inputs (additional utility)
function clearInputs() {
    document.getElementById('num1').value = '';
    document.getElementById('num2').value = '';
    document.getElementById('result').innerHTML = 'Result will appear here';
    document.getElementById('result').style.backgroundColor = '';
    document.getElementById('error-message').innerHTML = '';
}

// Add clear button functionality (optional)
// You can add a clear button in HTML if you want