// Store questions and correct answers in variables
// Using different variable types as per lab requirements
const question1 = "What does DOM stand for in JavaScript?";
const question2 = "Which keyword is used to declare a block-scoped variable?";
const question3 = "What will typeof 42 return?";
const question4 = "Which method is used to access an element by its ID?";
const question5 = "Which operator is used for strict equality comparison?";

// Store correct answers
const correctAnswer1 = "Document Object Model";
const correctAnswer2 = "let";  // let is block-scoped
const correctAnswer3 = "number";
const correctAnswer4 = "getElementById";
const correctAnswer5 = "===";

// Using different data types as per lab requirements
let totalQuestions = 5;  // Number
const quizName = "JavaScript Fundamentals Quiz";  // String
let isQuizSubmitted = false;  // Boolean
let quizScore = null;  // Null initially
let unansweredQuestions;  // Undefined initially

// Function to check individual answer
function checkAnswer(questionNumber, userAnswer) {
    // Using switch statement as per lab requirements
    switch(questionNumber) {
        case 1:
            return userAnswer === correctAnswer1;
        case 2:
            return userAnswer === correctAnswer2;
        case 3:
            return userAnswer === correctAnswer3;
        case 4:
            return userAnswer === correctAnswer4;
        case 5:
            return userAnswer === correctAnswer5;
        default:
            return false;
    }
}

// Main function to submit quiz and calculate score
function submitQuiz() {
    let score = 0;
    let answers = [];
    
    // Get all selected answers using loop (as per lab requirements)
    for(let i = 1; i <= totalQuestions; i++) {
        let radios = document.getElementsByName(`q${i}`);
        let selectedValue = "";
        
        // Check which radio is selected
        for(let radio of radios) {
            if(radio.checked) {
                selectedValue = radio.value;
                break;
            }
        }
        
        answers.push(selectedValue);
        
        // Check if answer is correct using function
        if(selectedValue && checkAnswer(i, selectedValue)) {
            score++;
        }
    }
    
    // Calculate percentage
    let percentage = (score / totalQuestions) * 100;
    
    // Display results using DOM manipulation
    displayResults(score, percentage, answers);
    
    // Mark quiz as submitted
    isQuizSubmitted = true;
    quizScore = score;
}

// Function to display results dynamically
function displayResults(score, percentage, answers) {
    let resultDiv = document.getElementById('result');
    
    // Determine message based on score using conditional statements
    let message = "";
    let messageClass = "";
    
    if(score === totalQuestions) {
        message = "🏆 Excellent! Perfect Score! You're a JavaScript Master!";
        messageClass = "excellent";
    } else if(score >= 4) {
        message = "🌟 Great Job! You have good JavaScript knowledge!";
        messageClass = "great";
    } else if(score >= 3) {
        message = "👍 Good attempt! Keep practicing!";
        messageClass = "good";
    } else if(score >= 2) {
        message = "📚 Need more practice. Try again!";
        messageClass = "average";
    } else {
        message = "💪 Don't give up! Review the concepts and try again!";
        messageClass = "poor";
    }
    
    // Build result HTML using DOM manipulation
    let resultHTML = `
        <h2>Quiz Results</h2>
        <p class="score">Your Score: ${score}/${totalQuestions} (${percentage.toFixed(1)}%)</p>
        <p class="message ${messageClass}">${message}</p>
    `;
    
    // Add detailed breakdown (using ternary operator - part of conditional)
    resultHTML += `<h3>Question Breakdown:</h3><ul>`;
    
    // Using loop to display each question result
    for(let i = 0; i < answers.length; i++) {
        let isCorrect = checkAnswer(i + 1, answers[i]);
        let status = isCorrect ? "✅ Correct" : "❌ Incorrect";
        let color = isCorrect ? "green" : "red";
        
        resultHTML += `<li style="color: ${color};">Question ${i + 1}: ${answers[i] ? answers[i] : "Not answered"} - ${status}</li>`;
    }
    
    resultHTML += `</ul>`;
    
    // Display in DOM
    resultDiv.innerHTML = resultHTML;
    
    // Change background color based on score
    if(score === totalQuestions) {
        resultDiv.style.backgroundColor = "#d4edda";
        resultDiv.style.color = "#155724";
        resultDiv.style.border = "2px solid #c3e6cb";
    } else if(score >= 3) {
        resultDiv.style.backgroundColor = "#fff3cd";
        resultDiv.style.color = "#856404";
        resultDiv.style.border = "2px solid #ffeeba";
    } else {
        resultDiv.style.backgroundColor = "#f8d7da";
        resultDiv.style.color = "#721c24";
        resultDiv.style.border = "2px solid #f5c6cb";
    }
}

// Reset quiz function
function resetQuiz() {
    // Clear all radio buttons using loop
    for(let i = 1; i <= totalQuestions; i++) {
        let radios = document.getElementsByName(`q${i}`);
        for(let radio of radios) {
            radio.checked = false;
        }
    }
    
    // Clear result display
    let resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    resultDiv.style.backgroundColor = '';
    resultDiv.style.border = '';
    
    // Reset variables
    isQuizSubmitted = false;
    quizScore = null;
    
    // Show confirmation using BOM (Browser Object Model)
    alert('Quiz has been reset! You can start over.');
}

// Bonus: Add keyboard shortcut (Ctrl+Enter to submit)
document.addEventListener('keydown', function(event) {
    if(event.ctrlKey && event.key === 'Enter') {
        submitQuiz();
    }
});

// Initialize quiz with console message (demonstrating typeof)
console.log('Quiz initialized!');
console.log('Type of totalQuestions:', typeof totalQuestions);  // number
console.log('Type of quizName:', typeof quizName);  // string
console.log('Type of isQuizSubmitted:', typeof isQuizSubmitted);  // boolean
console.log('Type of quizScore:', typeof quizScore);  // object (null)
console.log('Type of unansweredQuestions:', typeof unansweredQuestions);  // undefined

// Display welcome message using BOM
window.onload = function() {
    // Using BOM to show browser info
    console.log('Browser Info:', navigator.userAgent);
    console.log('Window Size:', window.innerWidth, 'x', window.innerHeight);
};