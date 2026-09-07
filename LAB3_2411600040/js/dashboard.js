document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
        window.location.href = 'index.html';
        return;
    }

    const username = localStorage.getItem('user') || 'User';

    updateGreeting(username);

    updateStatistics();

    populateActivityTable();

    setupLogout();

    const userNameSpan = document.getElementById('userName');
    if (userNameSpan) {
        userNameSpan.textContent = username;
    }

    // Lab 4 additions
    DataManager.initializeData();
    renderExerciseTable(DataManager.getExercises());
    renderAlerts();
    renderAllCharts();
    setupFilterListeners();
    setupSearchListener();
    setupExportButton();
    startRealtimeSimulation();
});

function updateGreeting(username) {
    const greetingElement = document.getElementById('greeting');
    if (!greetingElement) return;

    const hour = new Date().getHours();
    let timeOfDay = '';

    if (hour >= 5 && hour < 12) {
        timeOfDay = 'Good Morning';
    } else if (hour >= 12 && hour < 17) {
        timeOfDay = 'Good Afternoon';
    } else if (hour >= 17 && hour < 21) {
        timeOfDay = 'Good Evening';
    } else {
        timeOfDay = 'Good Night';
    }

    greetingElement.textContent = `${timeOfDay}, ${username}!`;
}

function updateStatistics() {
    const stats = [
        { title: 'Steps', value: '8,542', color: 'text-primary', icon: '👣' },
        { title: 'Calories', value: '1,860', color: 'text-success', icon: '🔥'},
        { title: 'Workouts', value: '4', color: 'text-info', icon: '💪'},
        { title: 'Heart Rate', value: '72 bpm', color: 'text-warning', icon: '❤️'}
    ];

    stats.forEach((stat, index) => {
        const titleElement = document.getElementById(`stat${index + 1}-title`);
        const valueElement = document.getElementById(`stat${index + 1}-value`);

        if (titleElement) {
            titleElement.textContent = `${stat.icon} ${stat.title}`;
        }
        if (valueElement) {
            valueElement.textContent = stat.value;
            // Remove existing color classes and add the new one
            valueElement.className = `card-text fw-bold ${stat.color}`;
        }
    });
}

function populateActivityTable() {
    const tableBody = document.getElementById('activityTableBody');
    if (!tableBody) return;

    const activities = [
        { date: '2026-08-8', activity: 'Completed 5k run - 30 minutes', status: 'completed'},
        { date: '2026-08-10', activity: 'Daily step goal reached - 10,000 steps', status: 'info'},
        { date: '2026-08-11', activity: 'Missed scheduled workout - Leg day', status: 'failure'},
        { date: '2026-08-12', activity: 'New personal record achieved: Pull-ups 20', status: 'completed'},
        { date: '2026-08-13', activity: 'High intensity whole body workout', status: 'completed'},
        { date: '2026-08-13', activity: 'Heart rate spike detected during workout', status: 'risk'}
    ];

    tableBody.innerHTML = '';

    activities.forEach(activity => {
        const row = document.createElement('tr');

        let badgeClass = 'bg-secondary';
        if (activity.status === 'completed') badgeClass = 'bg-success';
        else if (activity.status === 'failure') badgeClass = 'bg-warning text-dark';
        else if (activity.status === 'risk') badgeClass = 'bg-danger';
        else if (activity.status === 'info') badgeClass = 'bg-info text-dark';

        row.innerHTML = `
            <td>${activity.date}</td>
            <td>${activity.activity}</td>
            <td><span class="badge ${badgeClass}">${activity.status}</span></td>
        `;

        tableBody.appendChild(row);
    });
}

function setupLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    const logoutLink = document.getElementById('logoutLink');

    function performLogout(e) {
        e.preventDefault();
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
        window.location.href = 'index.html';
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', performLogout);
    }
    if (logoutLink) {
        logoutLink.addEventListener('click', performLogout);
    }
}

// ===== Lab 4: Exercise Library Table =====
function renderExerciseTable(exercises) {
    const tableBody = document.getElementById('exerciseTableBody');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    exercises.forEach(ex => {
        const row = document.createElement('tr');
        row.classList.add('border-accent');
        if (ex.status === 'Behind') row.classList.add('table-warning');

        let badgeClass = 'bg-secondary';
        if (ex.status === 'Completed') badgeClass = 'bg-success';
        else if (ex.status === 'On Track') badgeClass = 'bg-info text-dark';
        else if (ex.status === 'Behind') badgeClass = 'bg-danger';

        row.innerHTML = `
            <td>${ex.name}</td>
            <td>${ex.category}</td>
            <td>${ex.sessionsCompleted} / ${ex.weeklyGoal}</td>
            <td>${ex.caloriesPerSession}</td>
            <td>${ex.totalCalories}</td>
            <td><span class="badge ${badgeClass}">${ex.status}</span></td>
        `;

        tableBody.appendChild(row);
    });
}

function renderAlerts() {
    const alertsContainer = document.getElementById('alertsContainer');
    if (!alertsContainer) return;

    const behindExercises = DataManager.getBehindGoalExercises();
    alertsContainer.innerHTML = '';

    if (behindExercises.length === 0) {
        alertsContainer.innerHTML = `
            <div class="alert alert-success" role="alert">
                Great job! You're on track with all your exercise goals.
            </div>
        `;
        return;
    }

    const names = behindExercises.map(ex => ex.name).join(', ');
    alertsContainer.innerHTML = `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Behind on goal:</strong> ${names}. Keep pushing to catch up this week!
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
}

function refreshDashboardData() {
    const filtered = DataManager.applyFilters();
    renderExerciseTable(filtered);
    renderAlerts();
    renderAllCharts();
}

function setupFilterListeners() {
    const categoryFilter = document.getElementById('categoryFilter');
    const statusButtons = document.querySelectorAll('.status-filter-btn');
    const minCaloriesInput = document.getElementById('minCalories');
    const maxCaloriesInput = document.getElementById('maxCalories');
    const applyBtn = document.getElementById('applyFiltersBtn');
    const resetBtn = document.getElementById('resetFiltersBtn');

    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            DataManager.filterByCategory(this.value);
        });
    }

    statusButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            statusButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            DataManager.filterByStatus(this.dataset.status);
        });
    });

    if (applyBtn) {
        applyBtn.addEventListener('click', function() {
            const min = minCaloriesInput.value ? parseFloat(minCaloriesInput.value) : null;
            const max = maxCaloriesInput.value ? parseFloat(maxCaloriesInput.value) : null;
            DataManager.filterByCaloriesRange(min, max);
            renderExerciseTable(DataManager.applyFilters());
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            DataManager.resetFilters();
            if (categoryFilter) categoryFilter.value = 'all';
            statusButtons.forEach(b => b.classList.remove('active'));
            document.querySelector('.status-filter-btn[data-status="all"]')?.classList.add('active');
            if (minCaloriesInput) minCaloriesInput.value = '';
            if (maxCaloriesInput) maxCaloriesInput.value = '';
            document.getElementById('searchInput').value = '';
            renderExerciseTable(DataManager.getExercises());
        });
    }
}

function setupSearchListener() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    searchInput.addEventListener('input', function() {
        DataManager.searchExercises(this.value);
        renderExerciseTable(DataManager.applyFilters());
    });
}

function setupExportButton() {
    const exportBtn = document.getElementById('exportCsvBtn');
    if (!exportBtn) return;

    exportBtn.addEventListener('click', function() {
        const data = DataManager.applyFilters();
        const csvContent = DataManager.exportToCSV(data);
        DataManager.downloadCSV(csvContent, 'exercise_library.csv');
    });
}

function startRealtimeSimulation() {
    setInterval(function() {
        const updated = DataManager.simulateSessionUpdate();
        refreshDashboardData();
        showToastNotification(`${updated.name} session logged! Total sessions: ${updated.sessionsCompleted}`);
    }, 15000);
}

function showToastNotification(message) {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast align-items-center text-white bg-primary border-0 show';
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">${message}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 5000);
}