/* ==========================================
   CYCLEFIT PLANNER
   UI MODULE
========================================== */

/* ==========================================
   RENDER SAVED PLANS
========================================== */

function renderPlans() {

    const container =
        document.getElementById(
            "savedPlans"
        );

    if (!container) {
        return;
    }

    const plans =
        getPlans();

    if (plans.length === 0) {

        container.innerHTML = `
            <article class="card empty-state">
                <h3>No Plans Found</h3>

                <p>
                    Create your first training plan
                    using the form above.
                </p>
            </article>
        `;

        return;
    }

    container.innerHTML =
        plans.map(plan => createPlanCard(plan))
        .join("");
}

/* ==========================================
   PLAN CARD
========================================== */

function createPlanCard(plan) {

    return `
        <article class="plan-card">

            <h3>
                ${plan.name}
            </h3>

            <p>
                <strong>Goal:</strong>
                ${plan.goal}
            </p>

            <p>
                <strong>BMI:</strong>
                ${plan.bmi}
            </p>

            <p>
                <strong>Calories:</strong>
                ${plan.calories}
            </p>

            <p>
                <strong>Hydration:</strong>
                ${plan.hydration} L
            </p>

            <p>
                <strong>Created:</strong>
                ${plan.created}
            </p>

            <div class="plan-actions">

                <button
                    class="delete-btn"
                    onclick="deletePlanById(${plan.id})"
                >
                    Delete
                </button>

            </div>

        </article>
    `;
}

/* ==========================================
   RESULTS PANEL
========================================== */

function displayResults(plan) {

    const results =
        document.getElementById(
            "results"
        );

    if (!results) {
        return;
    }

    results.innerHTML = `
        <article class="results-card">

            <h2>
                Personalized Training Plan
            </h2>

            <div class="metric">
                <strong>Name:</strong>
                ${plan.name}
            </div>

            <div class="metric">
                <strong>BMI:</strong>
                ${plan.bmi}
            </div>

            <div class="metric">
                <strong>Category:</strong>
                ${plan.bmiCategory}
            </div>

            <div class="metric">
                <strong>Calories:</strong>
                ${plan.calories}
            </div>

            <div class="metric">
                <strong>Hydration:</strong>
                ${plan.hydration} L
            </div>

            <div class="metric">
                <strong>Weekly Hours:</strong>
                ${plan.weeklyHours}
            </div>

            <div class="metric">
                <strong>Fitness Score:</strong>
                ${plan.fitnessScore}
            </div>

            <div class="metric">
                <strong>Intensity:</strong>
                ${plan.intensity}
            </div>

            <div class="metric">
                <strong>Recommendation:</strong>
                ${plan.recommendation}
            </div>

            <div class="metric">
                <strong>Recovery:</strong>
                ${plan.recovery}
            </div>

        </article>
    `;
}

/* ==========================================
   UPDATE STATISTICS
========================================== */

function updateStatistics() {

    const plans =
        getPlans();

    const totalPlans =
        document.getElementById(
            "totalPlans"
        );

    const averageBMI =
        document.getElementById(
            "averageBMI"
        );

    const totalCalories =
        document.getElementById(
            "totalCalories"
        );

    if (
        !totalPlans ||
        !averageBMI ||
        !totalCalories
    ) {
        return;
    }

    totalPlans.textContent =
        plans.length;

    if (plans.length === 0) {

        averageBMI.textContent = "0";
        totalCalories.textContent = "0";

        return;
    }

    const bmiAverage =
        plans.reduce(
            (sum, plan) =>
                sum + Number(plan.bmi),
            0
        ) / plans.length;

    const caloriesSum =
        plans.reduce(
            (sum, plan) =>
                sum +
                Number(plan.calories),
            0
        );

    averageBMI.textContent =
        bmiAverage.toFixed(1);

    totalCalories.textContent =
        caloriesSum;
}

/* ==========================================
   REFRESH UI
========================================== */

function refreshUI() {

    renderPlans();

    updateStatistics();

    if (
        typeof refreshDashboard ===
        "function"
    ) {
        refreshDashboard();
    }
}

/* ==========================================
   EMPTY RESULTS
========================================== */

function clearResults() {

    const results =
        document.getElementById(
            "results"
        );

    if (!results) {
        return;
    }

    results.innerHTML = "";
}

/* ==========================================
   LOADING MESSAGE
========================================== */

function showLoading() {

    const results =
        document.getElementById(
            "results"
        );

    if (!results) {
        return;
    }

    results.innerHTML = `
        <article class="results-card">

            <h3>
                Generating Plan...
            </h3>

            <p>
                Please wait.
            </p>

        </article>
    `;
}

/* ==========================================
   PAGE INITIALIZATION
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderPlans();

        updateStatistics();

    }
);