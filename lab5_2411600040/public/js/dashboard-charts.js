document.addEventListener('DOMContentLoaded', function () {
    const data = window.chartData;

    new Chart(document.getElementById('categoryChart'), {
        type: 'bar',
        data: {
            labels: data.categoryLabels,
            datasets: [{ label: 'Calories', data: data.categoryValues, backgroundColor: '#565264' }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
    });

    new Chart(document.getElementById('statusChart'), {
        type: 'doughnut',
        data: {
            labels: ['Completed', 'On Track', 'Behind'],
            datasets: [{
                data: [data.completed, data.onTrack, data.behindGoal],
                backgroundColor: ['#706677', '#a6808c', '#dc3545']
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });

    new Chart(document.getElementById('topExercisesChart'), {
        type: 'bar',
        data: {
            labels: data.topNames,
            datasets: [{ label: 'Calories', data: data.topCalories, backgroundColor: '#ccb7ae' }]
        },
        options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
    });
});