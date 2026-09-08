let categoryChart = null;
let statusChart = null;
let topExercisesChart = null;

function getThemeColors() {
    const styles = getComputedStyle(document.documentElement);
    return {
        primary: styles.getPropertyValue('--theme-primary').trim(),
        secondary: styles.getPropertyValue('--theme-secondary').trim(),
        accent: styles.getPropertyValue('--theme-accent').trim(),
        lightAccent: styles.getPropertyValue('--theme-light-accent').trim()
    };
}

function renderCategoryChart() {
    const summary = DataManager.getCategorySummary();
    const ctx = document.getElementById('categoryChart').getContext('2d');
    const colors = getThemeColors();

    if (categoryChart) categoryChart.destroy();

    categoryChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: summary.map(s => s.category),
            datasets: [{
                label: 'Calories Burned',
                data: summary.map(s => s.totalCalories),
                backgroundColor: colors.primary
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true } }
        }
    });
}

function renderStatusChart() {
    const stats = DataManager.getGoalStatistics();
    const ctx = document.getElementById('statusChart').getContext('2d');
    const colors = getThemeColors();

    if (statusChart) statusChart.destroy();

    statusChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Completed', 'On Track', 'Behind'],
            datasets: [{
                data: [stats.completed, stats.onTrack, stats.behind],
                backgroundColor: [colors.secondary, colors.accent, '#dc3545']
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

function renderTopExercisesChart() {
    const top5 = DataManager.getExercises().sort((a, b) => b.totalCalories - a.totalCalories).slice(0, 5);
    const ctx = document.getElementById('topExercisesChart').getContext('2d');
    const colors = getThemeColors();

    if (topExercisesChart) topExercisesChart.destroy();

    topExercisesChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: top5.map(ex => ex.name),
            datasets: [{
                label: 'Calories Burned',
                data: top5.map(ex => ex.totalCalories),
                backgroundColor: colors.lightAccent
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } }
        }
    });
}

function renderAllCharts() {
    renderCategoryChart();
    renderStatusChart();
    renderTopExercisesChart();
}