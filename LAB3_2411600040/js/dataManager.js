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

    async function initializeData() {
        try {
            const response = await fetch('api/exercises.php');
            if (!response.ok) throw new Error('Network response was not ok');
            exercises = await response.json();
        } catch (error) {
            console.error('Failed to fetch exercises from API, using fallback data:', error);
            exercises = [
                { id: 1, name: 'Morning Run', category: 'Cardio', sessionsCompleted: 8, weeklyGoal: 10, caloriesPerSession: 320 },
                { id: 2, name: 'Cycling', category: 'Cardio', sessionsCompleted: 4, weeklyGoal: 6, caloriesPerSession: 280 }
            ];
        }
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

    // Sends an updated session count to the PHP backend and updates local cache
    async function updateSessionOnServer(id, newSessionsCompleted) {
        try {
            const response = await fetch('api/exercises.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: id, sessionsCompleted: newSessionsCompleted })
            });

            if (!response.ok) throw new Error('Failed to update on server');

            const result = await response.json();

            const localExercise = exercises.find(ex => ex.id === id);
            if (localExercise) {
                localExercise.sessionsCompleted = newSessionsCompleted;
            }

            return result.updated;
        } catch (error) {
            console.error('Error updating session on server:', error);
            return null;
        }
    }

    async function simulateSessionUpdate() {
        const randomIndex = Math.floor(Math.random() * exercises.length);
        const exercise = exercises[randomIndex];
        const newCount = exercise.sessionsCompleted + 1;
        await updateSessionOnServer(exercise.id, newCount);
        return exercises[randomIndex];
    }

    return {
        initializeData, getExercises, getExerciseById, getExercisesByCategory,
        getBehindGoalExercises, getGoalStatistics, getCategorySummary,
        filterByCategory, filterByStatus, filterByCaloriesRange, searchExercises,
        applyFilters, resetFilters, exportToCSV, downloadCSV,
        updateSessionOnServer, simulateSessionUpdate
    };
})();