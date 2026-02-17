// Store tasks in an array
let tasks = [
    { id: 'task1', text: 'Complete JavaScript Lab', completed: false, removed: false, priority: 'high' },
    { id: 'task2', text: 'Review DOM Manipulation', completed: false, removed: false, priority: 'medium' },
    { id: 'task3', text: 'Practice JavaScript', completed: false, removed: false, priority: 'low' }
];

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    console.log('To-Do List Initialized');
    updateProgress();
    updateStatusMessage();
    styleAllTasks();
    
    // Show browser info
    console.log('Browser Info:', navigator.userAgent);
    console.log('Window Size:', window.innerWidth, 'x', window.innerHeight);
});

// Function to toggle task completion
function toggleComplete(taskId) {
    let taskElement = document.getElementById(taskId);
    let task = tasks.find(t => t.id === taskId);
    
    if (task) {
        // Toggle completed status
        task.completed = !task.completed;
        
        // Update UI
        if (task.completed) {
            taskElement.classList.add('completed');
            showNotification('✅ Task completed!', 'success');
        } else {
            taskElement.classList.remove('completed');
            showNotification('↩️ Task marked incomplete', 'info');
        }
        
        // Update progress and status
        updateProgress();
        updateStatusMessage();
        
        // Log the action
        console.log(`Task ${taskId} toggled:`, task.completed);
    }
}

// Function to remove a task
function removeTask(taskId) {
    let taskElement = document.getElementById(taskId);
    let task = tasks.find(t => t.id === taskId);
    
    if (task && confirm(`Remove "${task.text}"?`)) {
        // Mark as removed
        task.removed = true;
        
        // Add removing animation
        taskElement.classList.add('removing');
        
        // Hide after animation
        setTimeout(() => {
            taskElement.style.display = 'none';
            
            // Update progress and status
            updateProgress();
            updateStatusMessage();
            
            showNotification('🗑️ Task removed', 'info');
            
            console.log(`Task ${taskId} removed`);
        }, 300);
    }
}

// Function to reset all tasks
function resetTasks() {
    if (confirm('Reset all tasks?')) {
        // Reset all tasks in array
        tasks.forEach(task => {
            task.completed = false;
            task.removed = false;
        });
        
        // Reset all task elements
        for(let i = 1; i <= 3; i++) {
            let taskElement = document.getElementById(`task${i}`);
            taskElement.style.display = 'flex';
            taskElement.classList.remove('completed', 'removing');
        }
        
        // Update UI
        updateProgress();
        updateStatusMessage();
        showNotification('🔄 All tasks reset', 'info');
        
        console.log('All tasks reset');
    }
}

// Function to complete all tasks
function completeAllTasks() {
    let anyCompleted = false;
    
    tasks.forEach(task => {
        if (!task.removed && !task.completed) {
            task.completed = true;
            let taskElement = document.getElementById(task.id);
            taskElement.classList.add('completed');
            anyCompleted = true;
        }
    });
    
    if (anyCompleted) {
        updateProgress();
        updateStatusMessage();
        showNotification('🎉 All tasks completed!', 'success');
    } else {
        showNotification('✨ All tasks already completed!', 'info');
    }
}

// Function to update progress bar and counts
function updateProgress() {
    let totalVisible = tasks.filter(t => !t.removed).length;
    let completed = tasks.filter(t => t.completed && !t.removed).length;
    let percentage = totalVisible > 0 ? (completed / totalVisible) * 100 : 0;
    
    // Update progress bar
    let progressFill = document.getElementById('progressFill');
    if (progressFill) {
        progressFill.style.width = percentage + '%';
    }
    
    // Update counts
    let completedSpan = document.getElementById('completedCount');
    let remainingSpan = document.getElementById('remainingCount');
    
    if (completedSpan) completedSpan.textContent = completed;
    if (remainingSpan) remainingSpan.textContent = totalVisible - completed;
}

// Function to update status message
function updateStatusMessage() {
    let statusDiv = document.getElementById('statusMessage');
    if (!statusDiv) return;
    
    let totalVisible = tasks.filter(t => !t.removed).length;
    let completed = tasks.filter(t => t.completed && !t.removed).length;
    
    let message = '';
    let icon = '';
    
    if (totalVisible === 0) {
        message = 'No tasks left! Add more tasks or reset.';
        icon = '🎉';
        statusDiv.style.background = 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)';
    } else if (completed === totalVisible && totalVisible > 0) {
        message = 'All tasks completed! Great job!';
        icon = '✅';
        statusDiv.style.background = 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)';
    } else if (completed > 0) {
        message = `${completed} of ${totalVisible} tasks completed`;
        icon = '📝';
        statusDiv.style.background = 'linear-gradient(135deg, #667eea10 0%, #764ba210 100%)';
    } else {
        message = 'Click on tasks to mark them complete';
        icon = '👆';
        statusDiv.style.background = 'linear-gradient(135deg, #667eea10 0%, #764ba210 100%)';
    }
    
    statusDiv.innerHTML = `<i class="fas fa-info-circle"></i> ${icon} ${message}`;
}

// Function to show notifications
function showNotification(message, type = 'info') {
    let statusDiv = document.getElementById('statusMessage');
    if (!statusDiv) return;
    
    let icon = type === 'success' ? '✅' : 'ℹ️';
    statusDiv.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i> ${icon} ${message}`;
    
    if (type === 'success') {
        statusDiv.style.background = 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)';
    } else {
        statusDiv.style.background = 'linear-gradient(135deg, #667eea10 0%, #764ba210 100%)';
    }
    
    // Auto-revert after 3 seconds
    setTimeout(() => {
        updateStatusMessage();
    }, 3000);
}

// Function to style all tasks using loop
function styleAllTasks() {
    let taskInputs = document.querySelectorAll('.task-input');
    for(let i = 0; i < taskInputs.length; i++) {
        taskInputs[i].style.fontFamily = 'Poppins, sans-serif';
        taskInputs[i].style.fontWeight = '400';
    }
    
    let buttons = document.querySelectorAll('button');
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].style.cursor = 'pointer';
    }
}

// Function to show statistics
function showStats() {
    let completed = tasks.filter(t => t.completed && !t.removed).length;
    let remaining = tasks.filter(t => !t.completed && !t.removed).length;
    let removed = tasks.filter(t => t.removed).length;
    let percentage = Math.round((completed / (completed + remaining)) * 100) || 0;
    
    let statsMessage = `📊 TASK STATISTICS
    ═════════════════
    ✅ Completed: ${completed}
    ⏳ Remaining: ${remaining}
    🗑️ Removed: ${removed}
    📈 Progress: ${percentage}%
    ═════════════════`;
    
    alert(statsMessage);
}

// Function to toggle theme
function toggleTheme() {
    let html = document.documentElement;
    let currentTheme = html.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        html.removeAttribute('data-theme');
        showNotification('☀️ Light mode activated', 'info');
    } else {
        html.setAttribute('data-theme', 'dark');
        showNotification('🌙 Dark mode activated', 'info');
    }
}

// Function to toggle shortcuts panel
function toggleShortcuts() {
    let content = document.querySelector('.shortcuts-content');
    let header = document.querySelector('.shortcuts-header');
    
    if (content && header) {
        content.classList.toggle('show');
        header.classList.toggle('active');
    }
}

// Update keyboard shortcuts
document.addEventListener('keydown', function(event) {
    let key = event.key.toLowerCase();
    
    switch(key) {
        case '1':
            toggleComplete('task1');
            break;
        case '2':
            toggleComplete('task2');
            break;
        case '3':
            toggleComplete('task3');
            break;
        case 'r':
            resetTasks();
            break;
        case 'c':
            completeAllTasks();
            break;
        case 'h':
            toggleTheme();
            break;
        case 's':
            showStats();
            break;
    }
});

// Make functions globally available
window.toggleComplete = toggleComplete;
window.removeTask = removeTask;
window.resetTasks = resetTasks;
window.completeAllTasks = completeAllTasks;
window.showStats = showStats;
window.toggleTheme = toggleTheme;
window.toggleShortcuts = toggleShortcuts;