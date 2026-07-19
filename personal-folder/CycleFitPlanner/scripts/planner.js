/* Planner page */

document.addEventListener(
    "DOMContentLoaded",
    initializePlanner
);

/* Initialize Planner */

function initializePlanner() {

    const form =
        document.getElementById(
            "planForm"
        );

    if (!form) {
        return;
    }

    form.addEventListener(
        "submit",
        handlePlanSubmit
    );

    renderPlans();
}

/* Handle Plan Submit */

function handlePlanSubmit(event) {

    event.preventDefault();

    const name =
        document.getElementById("name")
        .value
        .trim();

    const weight =
        Number(
            document.getElementById(
                "weight"
            ).value
        );

    const height =
        Number(
            document.getElementById(
                "height"
            ).value
        );

    const minutes =
        Number(
            document.getElementById(
                "minutes"
            ).value
        );

    const goal =
        document.getElementById(
            "goal"
        ).value;

    if (
        !validateForm(
            name,
            weight,
            height,
            minutes
        )
    ) {
        return;
    }

    /* = Create Complete Profile = */

    const plan =
        buildCyclistProfile(
            name,
            weight,
            height,
            minutes,
            goal
        );

    savePlan(plan);

    displayResults(plan);

    renderPlans();

    updateStatistics();

    if (
        typeof refreshDashboard ===
        "function"
    ) {
        refreshDashboard();
    }

    document
        .getElementById(
            "planForm"
        )
        .reset();
}

/* Validatioon */

function validateForm(
    name,
    weight,
    height,
    minutes
) {

    if (!name) {

        alert(
            "Please enter your name."
        );

        return false;
    }

    if (
        weight <= 0 ||
        height <= 0 ||
        minutes <= 0
    ) {

        alert(
            "Please enter valid values."
        );

        return false;
    }

    return true;
}

/* Results */

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

            <h3>
                Personalized Training Plan
            </h3>

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
                <strong>Recommendation:</strong>
                ${plan.recommendation}
            </div>

        </article>
    `;
}

/* Render Savid Plans */

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
            <p>
                No saved plans yet.
            </p>
        `;

        return;
    }

    container.innerHTML =
        plans.map(plan => `
            <article class="plan-card">

                <h3>
                    ${plan.name}
                </h3>

                <p>
                    Goal:
                    ${plan.goal}
                </p>

                <p>
                    BMI:
                    ${plan.bmi}
                </p>

                <p>
                    Fitness Score:
                    ${plan.fitnessScore}
                </p>

                <p>
                    Date:
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
        `).join("");
}

/* Delete Plan by ID */

function deletePlanById(id) {

    const plans =
        getPlans();

    const updatedPlans =
        plans.filter(
            plan =>
                plan.id !== id
        );

    localStorage.setItem(
        "plans",
        JSON.stringify(
            updatedPlans
        )
    );

    renderPlans();

    updateStatistics();

    if (
        typeof refreshDashboard ===
        "function"
    ) {
        refreshDashboard();
    }
}