// Quiz Data
const quizData = {
    questions: [
        {
            id: 1,
            text: "What does DOM stand for in JavaScript?",
            options: ["Document Object Model", "Data Object Model", "Document Oriented Model", "Dynamic Object Management"],
            correct: "Document Object Model",
            difficulty: "easy",
            hint: "It's about HTML elements"
        },
        {
            id: 2,
            text: "Which keyword is used to declare a block-scoped variable?",
            options: ["var", "let", "const", "function"],
            correct: "let",
            difficulty: "medium",
            hint: "ES6 introduced two new keywords"
        },
        {
            id: 3,
            text: "What will typeof 42 return?",
            options: ["string", "number", "boolean", "object"],
            correct: "number",
            difficulty: "easy",
            hint: "It's a primitive data type"
        },
        {
            id: 4,
            text: "Which method is used to access an element by its ID?",
            options: ["getElementById()", "getElementsByClass()", "querySelector()", "getElementByTag()"],
            correct: "getElementById",
            difficulty: "medium",
            hint: "It starts with 'getElement'"
        },
        {
            id: 5,
            text: "Which operator is used for strict equality comparison?",
            options: ["==", "===", "=", "!="],
            correct: "===",
            difficulty: "hard",
            hint: "It compares both value and type"
        }
    ]
};

// State Management
let userAnswers = {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null
};

let questionStatus = {
    1: 'unanswered',
    2: 'unanswered',
    3: 'unanswered',
    4: 'unanswered',
    5: 'unanswered'
};

let score = 0;
let timerInterval;
let timeLeft = 300; // 5 minutes in seconds

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    console.log('QuizMaster Pro Initialized');
    initializeQuiz();
    startTimer();
    setupEventListeners();
});

// Initialize Quiz
function initializeQuiz() {
    updateProgress();
    updateTimerDisplay();
    displayBrowserInfo();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

// Timer Functions
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        // Update progress bar
        let progress = ((300 - timeLeft) / 300) * 100;
        document.getElementById('timerProgress').style.transform = `scaleX(${progress / 100})`;
        
        // Time's up
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timeUp();
        }
    }, 1000);
}

function updateTimerDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    
    // Warning when less than 1 minute
    if (timeLeft <= 60) {
        document.getElementById('timerDisplay').style.color = 'var(--danger)';
    }
}

function timeUp() {
    showNotification('⏰ Time\'s up! Submitting quiz...', 'warning');
    submitQuiz();
}

// Browser Info (BONUS)
function displayBrowserInfo() {
    console.log('=== Browser Information ===');
    console.log('User Agent:', navigator.userAgent);
    console.log('Window Size:', window.innerWidth, 'x', window.innerHeight);
    console.log('Screen Size:', screen.width, 'x', screen.height);
    console.log('Platform:', navigator.platform);
    console.log('Language:', navigator.language);
    console.log('Online Status:', navigator.onLine ? 'Online' : 'Offline');
    console.log('========================');
}

// Check Individual Answer
function checkAnswer(questionId) {
    let selectedOption = document.querySelector(`input[name="q${questionId}"]:checked`);
    let questionCard = document.getElementById(`question${questionId}`);
    let checkBtn = document.getElementById(`checkBtn${questionId}`);
    
    if (!selectedOption) {
        showNotification(`⚠️ Please select an answer for Question ${questionId}`, 'warning');
        questionCard.classList.add('shake');
        setTimeout(() => questionCard.classList.remove('shake'), 300);
        return;
    }
    
    let answer = selectedOption.value;
    let isCorrect = answer === quizData.questions[questionId - 1].correct;
    
    // Store answer
    userAnswers[questionId] = answer;
    
    // Update status
    questionStatus[questionId] = isCorrect ? 'correct' : 'incorrect';
    
    // Update UI
    questionCard.classList.remove('answered', 'correct', 'incorrect');
    questionCard.classList.add('answered', isCorrect ? 'correct' : 'incorrect');
    
    // Update check button
    checkBtn.innerHTML = isCorrect ? 
        '<i class="fas fa-check-circle"></i> Correct!' : 
        '<i class="fas fa-times-circle"></i> Incorrect';
    checkBtn.style.background = isCorrect ? 'var(--success)' : 'var(--danger)';
    checkBtn.style.color = 'white';
    
    // Show feedback
    showNotification(
        isCorrect ? '✅ Correct answer!' : '❌ Incorrect. Try again!',
        isCorrect ? 'success' : 'error'
    );
    
    // Update progress
    updateProgress();
}

// Submit Quiz
function submitQuiz() {
    clearInterval(timerInterval);
    
    let answered = 0;
    let correctAnswers = 0;
    
    // Calculate score
    for (let i = 1; i <= 5; i++) {
        if (userAnswers[i]) {
            answered++;
            if (userAnswers[i] === quizData.questions[i - 1].correct) {
                correctAnswers++;
            }
        }
    }
    
    score = correctAnswers;
    
    // Show results
    displayResults(answered, correctAnswers);
}

// Display Results
function displayResults(answered, correctAnswers) {
    let resultDiv = document.getElementById('result');
    let percentage = (correctAnswers / 5) * 100;
    
    // Determine result class and message
    let resultClass, icon, title, message;
    
    if (correctAnswers === 5) {
        resultClass = 'excellent';
        icon = '🎉';
        title = 'Perfect Score!';
        message = 'Outstanding! You\'re a JavaScript Master!';
    } else if (correctAnswers >= 4) {
        resultClass = 'excellent';
        icon = '🌟';
        title = 'Great Job!';
        message = 'Excellent knowledge of JavaScript fundamentals!';
    } else if (correctAnswers >= 3) {
        resultClass = 'good';
        icon = '👍';
        title = 'Good Effort!';
        message = 'Good attempt! Keep practicing to improve.';
    } else {
        resultClass = 'poor';
        icon = '💪';
        title = 'Keep Learning!';
        message = 'Don\'t give up! Review the concepts and try again.';
    }
    
    // Build result HTML
    let resultHTML = `
        <div class="result-header">
            <i class="fas ${resultClass === 'excellent' ? 'fa-trophy' : (resultClass === 'good' ? 'fa-smile' : 'fa-book')}"></i>
            <h2>${icon} ${title}</h2>
        </div>
        <div class="result-score">
            <div class="score-circle">
                ${correctAnswers}/5
            </div>
            <div class="score-percentage">${percentage.toFixed(0)}%</div>
            <div class="score-message">${message}</div>
        </div>
        <div class="result-breakdown">
    `;
    
    // Add breakdown
    for (let i = 1; i <= 5; i++) {
        let isCorrect = userAnswers[i] === quizData.questions[i - 1].correct;
        let status = isCorrect ? '✅ Correct' : '❌ Incorrect';
        let statusClass = isCorrect ? 'correct' : 'incorrect';
        
        resultHTML += `
            <div class="breakdown-item ${statusClass}">
                <i class="fas ${isCorrect ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                <span>Question ${i}: ${userAnswers[i] ? userAnswers[i] : 'Not answered'} - ${status}</span>
            </div>
        `;
    }
    
    resultHTML += '</div>';
    
    // Display result
    resultDiv.innerHTML = resultHTML;
    resultDiv.style.display = 'block';
    resultDiv.className = `result-container ${resultClass}`;
    
    // Show feedback section
    showFeedback();
    
    // Scroll to results
    resultDiv.scrollIntoView({ behavior: 'smooth' });
}

// Reset Quiz
function resetQuiz() {
    if (confirm('Are you sure you want to reset the quiz?')) {
        // Reset state
        userAnswers = {1: null, 2: null, 3: null, 4: null, 5: null};
        questionStatus = {1: 'unanswered', 2: 'unanswered', 3: 'unanswered', 4: 'unanswered', 5: 'unanswered'};
        score = 0;
        
        // Clear all selections
        for (let i = 1; i <= 5; i++) {
            let radios = document.getElementsByName(`q${i}`);
            radios.forEach(radio => radio.checked = false);
            
            // Reset question cards
            let questionCard = document.getElementById(`question${i}`);
            questionCard.classList.remove('answered', 'correct', 'incorrect');
            
            // Reset check buttons
            let checkBtn = document.getElementById(`checkBtn${i}`);
            checkBtn.innerHTML = `<i class="fas fa-check-circle"></i> Check Q${i}`;
            checkBtn.style.background = '';
            checkBtn.style.color = '';
        }
        
        // Reset timer
        clearInterval(timerInterval);
        timeLeft = 300;
        updateTimerDisplay();
        startTimer();
        
        // Hide result
        document.getElementById('result').style.display = 'none';
        
        // Update progress
        updateProgress();
        
        showNotification('🔄 Quiz has been reset!', 'info');
    }
}

// Show Answers
function showAnswers() {
    let answersList = '';
    quizData.questions.forEach((q, index) => {
        answersList += `Q${index + 1}: ${q.correct}\n`;
    });
    
    alert('📝 Correct Answers:\n\n' + answersList);
}

// Show Feedback
function showFeedback() {
    let feedbackContent = document.getElementById('feedbackContent');
    let feedbackHTML = '';
    
    quizData.questions.forEach((q, index) => {
        let questionNum = index + 1;
        let userAnswer = userAnswers[questionNum];
        let isCorrect = userAnswer === q.correct;
        
        feedbackHTML += `
            <div class="feedback-item ${isCorrect ? 'correct' : 'incorrect'}">
                <i class="fas ${isCorrect ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                <div>
                    <strong>Q${questionNum}:</strong> ${q.text}<br>
                    <small>Your answer: ${userAnswer || 'Not answered'}</small><br>
                    <small>Correct answer: ${q.correct}</small>
                </div>
            </div>
        `;
    });
    
    feedbackContent.innerHTML = feedbackHTML;
    document.getElementById('feedbackSection').style.display = 'block';
}

// Toggle Feedback
function toggleFeedback() {
    let content = document.getElementById('feedbackContent');
    let header = document.querySelector('.feedback-header');
    content.classList.toggle('show');
    header.classList.toggle('active');
}

// Update Progress
function updateProgress() {
    let answered = 0;
    let correct = 0;
    
    for (let i = 1; i <= 5; i++) {
        if (userAnswers[i]) {
            answered++;
            if (userAnswers[i] === quizData.questions[i - 1].correct) {
                correct++;
            }
        }
    }
    
    let answeredPercent = (answered / 5) * 100;
    document.getElementById('answeredCount').textContent = answered;
    document.getElementById('scoreDisplay').textContent = correct;
    document.getElementById('progressFill').style.width = answeredPercent + '%';
}

// Show Notification
function showNotification(message, type = 'info') {
    // Create temporary notification
    let notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? 'var(--success)' : (type === 'error' ? 'var(--danger)' : 'var(--primary)')};
        color: white;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Keyboard Shortcuts
function handleKeyboardShortcuts(event) {
    let key = event.key;
    
    // Numbers 1-5 for checking questions
    if (key >= '1' && key <= '5') {
        checkAnswer(parseInt(key));
    }
    
    // S for submit
    if (key.toLowerCase() === 's')