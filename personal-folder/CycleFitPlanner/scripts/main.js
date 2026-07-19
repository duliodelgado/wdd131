/* CycleFit Planner - Main Script */

document.addEventListener("DOMContentLoaded", () => {
    initializeSite();
});

/* Initialization */

function initializeSite() {
    restoreDarkMode();
    setupDarkModeButton();
    setupMobileMenu();
    renderDashboard();
}

/* Mobile Menu */

function setupMobileMenu() {
    const menuButton =
        document.getElementById("menuBtn");

    const navigation =
        document.getElementById("navigation");

    if (!menuButton || !navigation) {
        return;
    }

    menuButton.addEventListener(
        "click",
        () => {
            navigation.classList.toggle(
                "show-menu"
            );
        }
    );
}

/* Dark Mode */

function setupDarkModeButton() {
    const darkModeButton =
        document.getElementById(
            "darkModeBtn"
        );

    if (!darkModeButton) {
        return;
    }

    darkModeButton.addEventListener(
        "click",
        toggleDarkMode
    );
}

function toggleDarkMode() {
    document.body.classList.toggle(
        "dark-mode"
    );

    const isDarkMode =
        document.body.classList.contains(
            "dark-mode"
        );

    localStorage.setItem(
        "darkMode",
        JSON.stringify(isDarkMode)
    );
}

function restoreDarkMode() {
    const isDarkMode =
        JSON.parse(
            localStorage.getItem("darkMode")
        );

    if (isDarkMode) {
        document.body.classList.add(
            "dark-mode"
        );
    }
}

/* Dashboard Rendering */

function renderDashboard() {

    const dashboard =
        document.getElementById(
            "dashboard"
        );

    if (!dashboard) {
        return;
    }

    const plans = getStoredPlans();

    const totalPlans =
        plans.length;

    const averageBMI =
        calculateAverageBMI(
            plans
        );

    const totalCalories =
        calculateTotalCalories(
            plans
        );

    const favoriteGoal =
        getMostPopularGoal(
            plans
        );

    dashboard.innerHTML = `
        <div class="stats-grid">

            <article class="stat-card">
                <h3>Total Plans</h3>
                <p class="stat-value">
                    ${totalPlans}
                </p>
            </article>

            <article class="stat-card">
                <h3>Average BMI</h3>
                <p class="stat-value">
                    ${averageBMI}
                </p>
            </article>

            <article class="stat-card">
                <h3>Total Calories</h3>
                <p class="stat-value">
                    ${totalCalories}
                </p>
            </article>

            <article class="stat-card">
                <h3>Top Goal</h3>
                <p class="stat-value">
                    ${favoriteGoal}
                </p>
            </article>

        </div>
    `;
}

/* Storage Utilities */

function getStoredPlans() {

    return (
        JSON.parse(
            localStorage.getItem("plans")
        ) || []
    );
}

/* Average BMI */

function calculateAverageBMI(
    plans
) {

    if (plans.length === 0) {
        return "0";
    }

    const totalBMI =
        plans.reduce(
            (sum, plan) =>
                sum +
                Number(plan.bmi || 0),
            0
        );

    return (
        totalBMI /
        plans.length
    ).toFixed(1);
}

/* Total Calories */

function calculateTotalCalories(
    plans
) {

    return plans.reduce(
        (sum, plan) =>
            sum +
            Number(
                plan.calories || 0
            ),
        0
    );
}

/* Most Popular Goal */

function getMostPopularGoal(
    plans
) {

    if (plans.length === 0) {
        return "None";
    }

    const goalCounts = {};

    plans.forEach(plan => {

        if (
            goalCounts[
                plan.goal
            ]
        ) {

            goalCounts[
                plan.goal
            ]++;

        } else {

            goalCounts[
                plan.goal
            ] = 1;

        }

    });

    let topGoal = "None";
    let highestCount = 0;

    for (
        const goal
        in goalCounts
    ) {

        if (
            goalCounts[goal] >
            highestCount
        ) {

            highestCount =
                goalCounts[goal];

            topGoal =
                goal;
        }
    }

    return topGoal;
}

/* Notifications */

function showNotification(
    message,
    type = "success"
) {

    const notification =
        document.createElement(
            "div"
        );

    notification.classList.add(
        "notification"
    );

    notification.classList.add(
        type
    );

    notification.textContent =
        message;

    document.body.appendChild(
        notification
    );

    setTimeout(() => {

        notification.remove();

    }, 3000);
}

/* Refresh Dashboard */

function refreshDashboard() {
    renderDashboard();
}