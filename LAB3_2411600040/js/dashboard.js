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

    const cardTitles = document.querySelectorAll('[id^="stat"][id$="-title"]');
    const cardValues = document.querySelectorAll('[id^="stat"][id$="-value"]');

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
        { date: '2026-08-10', activity: 'Completed 5k run - 30 minutes', status: 'completed'},
        { date: '2026-08-10', activity: 'Daily step goal reached - 10,000 steps', status: 'info'},
        { date: '2026-08-10', activity: 'Missed scheduled workout - Leg day', status: 'failure'},
        { date: '2026-08-10', activity: 'New personal record achieved: Pull-ups 20', status: 'completed'},
        { date: '2026-08-11', activity: 'Logged 45-mins yoga session', status: 'completed'},
        { date: '2026-08-11', activity: 'Heart rate spike detected during workout', status: 'risk'}
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