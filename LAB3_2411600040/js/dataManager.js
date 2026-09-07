// dataManager.js - Handles all exercise data operations
const DataManager = (function () {
    let exercises = [];
    let activeFilters = {
        category: 'all',
        status: 'all',
        minCalories: null,
        maxCalories: null,
        searchQuery: ''
    };

    function initializeData() {
        exercises = [
            { id: 1, name: 'Morning Run', category: 'Cardio', sessionsCompleted: 8, weeklyGoal: 10, caloriesPerSession: 320 },
            { id: 2, name: 'Cycling', category: 'Cardio', sessionsCompleted: 4, weeklyGoal: 6, caloriesPerSession: 280 },
            { id: 3, name: 'Bench Press', category: 'Strength', sessionsCompleted: 3, weeklyGoal: 4, caloriesPerSession: 180 },
            { id: 4, name: 'Squats', category: 'Strength', sessionsCompleted: 2, weeklyGoal: 4, caloriesPerSession: 220 },
            { id: 5, name: 'Plank', category: 'Core', sessionsCompleted: 5, weeklyGoal: 5, caloriesPerSession: 90 },
            { id: 6, name: 'Sit-Ups', category: 'Core', sessionsCompleted: 1, weeklyGoal: 5, caloriesPerSession: 80 },
            { id: 7, name: 'Yoga', category: 'Flexibility', sessionsCompleted: 3, weeklyGoal: 3, caloriesPerSession: 150 },
            { id: 8, name: 'Stretching', category: 'Flexibility', sessionsCompleted: 1, weeklyGoal: 4, caloriesPerSession: 60 },
            { id: 9, name: 'Swimming', category: 'Cardio', sessionsCompleted: 2, weeklyGoal: 4, caloriesPerSession: 400 },
            { id: 10, name: 'Deadlift', category: 'Strength', sessionsCompleted: 1, weeklyGoal: 3, caloriesPerSession: 250 }
        ];
        return exercises;
    }

    function getStatus(ex) {
        if (ex.sessionsCompleted >= ex.weeklyGoal) return 'Completed';
        if (ex.sessionsCompleted >= ex.weeklyGoal * 0.5) return 'On Track';
        return 'Behind';
    }

    function getExercises() {
        return exercises.map(ex => ({
            ...ex,
            status: getStatus(ex),
            totalCalories: ex.sessionsCompleted * ex.caloriesPerSession
        }));
    }

    function getExerciseById(id) {
        return getExercises().find(ex => ex.id === id);
    }

    function getExercisesByCategory(category) {
        return getExercises().filter(ex => ex.category === category);
    }

    function getBehindGoalExercises() {
        return getExercises().filter(ex => ex.status === 'Behind');
    }

    function getGoalStatistics() {
        const all = getExercises();
        return {
            totalExercises: all.length,
            totalCalories: all.reduce((sum, ex) => sum + ex.totalCalories, 0),
            completed: all.filter(ex => ex.status === 'Completed').length,
            onTrack: all.filter(ex => ex.status === 'On Track').length,
            behind: all.filter(ex => ex.status === 'Behind').length
        };
    }

    function getCategorySummary() {
        const all = getExercises();
        const categories = [...new Set(all.map(ex => ex.category))];
        return categories.map(cat => {
            const items = all.filter(ex => ex.category === cat);
            return {
                category: cat,
                totalCalories: items.reduce((sum, ex) => sum + ex.totalCalories, 0),
                totalSessions: items.reduce((sum, ex) => sum + ex.sessionsCompleted, 0)
            };
        });
    }

    function filterByCategory(category) {
        activeFilters.category = category;
    }

    function filterByStatus(status) {
        activeFilters.status = status;
    }

    function filterByCaloriesRange(min, max) {
        activeFilters.minCalories = min;
        activeFilters.maxCalories = max;
    }

    function searchExercises(query) {
        activeFilters.searchQuery = query.toLowerCase();
    }

    function applyFilters() {
        let result = getExercises();

        if (activeFilters.category !== 'all') {
            result = result.filter(ex => ex.category === activeFilters.category);
        }
        if (activeFilters.status !== 'all') {
            result = result.filter(ex => ex.status === activeFilters.status);
        }
        if (activeFilters.minCalories !== null && !isNaN(activeFilters.minCalories)) {
            result = result.filter(ex => ex.totalCalories >= activeFilters.minCalories);
        }
        if (activeFilters.maxCalories !== null && !isNaN(activeFilters.maxCalories)) {
            result = result.filter(ex => ex.totalCalories <= activeFilters.maxCalories);
        }
        if (activeFilters.searchQuery) {
            result = result.filter(ex => ex.name.toLowerCase().includes(activeFilters.searchQuery));
        }

        return result;
    }

    function resetFilters() {
        activeFilters = { category: 'all', status: 'all', minCalories: null, maxCalories: null, searchQuery: '' };
    }

    function exportToCSV(data) {
        const headers = ['ID', 'Name', 'Category', 'Sessions Completed', 'Weekly Goal', 'Calories per Session', 'Total Calories', 'Status'];
        const rows = data.map(ex => [ex.id, ex.name, ex.category, ex.sessionsCompleted, ex.weeklyGoal, ex.caloriesPerSession, ex.totalCalories, ex.status]);
        return [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    }

    function downloadCSV(csvContent, filename) {
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function simulateSessionUpdate() {
        const randomIndex = Math.floor(Math.random() * exercises.length);
        exercises[randomIndex].sessionsCompleted += 1;
        return exercises[randomIndex];
    }

    return {
        initializeData, getExercises, getExerciseById, getExercisesByCategory,
        getBehindGoalExercises, getGoalStatistics, getCategorySummary,
        filterByCategory, filterByStatus, filterByCaloriesRange, searchExercises,
        applyFilters, resetFilters, exportToCSV, downloadCSV, simulateSessionUpdate
    };
})();