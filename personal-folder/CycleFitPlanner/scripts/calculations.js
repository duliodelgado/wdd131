/* ==========================================
   CYCLEFIT PLANNER
   CALCULATIONS MODULE
========================================== */

/* Bmi Calculation */

function calculateBMI(weight, height) {

    if (height <= 0) {
        return 0;
    }

    const heightMeters = height / 100;

    const bmi =
        weight /
        (heightMeters * heightMeters);

    return bmi.toFixed(1);
}

/* BMI Category */

function getBMICategory(bmi) {

    bmi = Number(bmi);

    if (bmi < 18.5) {
        return "Underweight";
    }

    if (bmi < 25) {
        return "Normal Weight";
    }

    if (bmi < 30) {
        return "Overweight";
    }

    return "Obesity";
}

/* Calories Burned */

function calculateCalories(minutes) {

    const caloriesPerMinute = 8;

    return Math.round(
        minutes * caloriesPerMinute
    );
}

/* Hydration Recommendation */

function calculateHydration(minutes) {

    const liters =
        minutes * 0.008;

    return liters.toFixed(1);
}

/* Weekly Hours */

function calculateWeeklyHours(minutes) {

    return (
        minutes / 60
    ).toFixed(1);
}

/* Training Plan Generator */

function generatePlan(goal) {

    switch (goal) {

        case "Weight Loss":

            return {
                rides: 4,
                recommendation:
                    "4 weekly rides focused on endurance and calorie burning."
            };

        case "Performance":

            return {
                rides: 5,
                recommendation:
                    "Include intervals, hill climbs, and recovery rides."
            };

        case "Endurance":

            return {
                rides: 3,
                recommendation:
                    "Prioritize long-distance aerobic rides."
            };

        default:

            return {
                rides: 3,
                recommendation:
                    "Maintain a balanced weekly training schedule."
            };
    }
}

/* Training Intensity */

function getIntensityLevel(minutes) {

    if (minutes < 120) {
        return "Beginner";
    }

    if (minutes < 300) {
        return "Intermediate";
    }

    return "Advanced";
}

/* Recovery Recommendation */

function getRecoveryRecommendation(minutes) {

    if (minutes < 180) {
        return "One rest day per week is recommended.";
    }

    if (minutes < 360) {
        return "Include two recovery sessions per week.";
    }

    return "Recovery rides and stretching are strongly recommended.";
}

/* Fitness Score */

function calculateFitnessScore(
    bmi,
    minutes
) {

    let score = 50;

    bmi = Number(bmi);

    if (bmi >= 18.5 && bmi <= 24.9) {
        score += 20;
    }

    if (minutes >= 180) {
        score += 15;
    }

    if (minutes >= 300) {
        score += 15;
    }

    return Math.min(score, 100);
}

/* Cyclist Profile Builder */

function buildCyclistProfile(
    name,
    weight,
    height,
    minutes,
    goal
) {

    const bmi =
        calculateBMI(
            weight,
            height
        );

    const calories =
        calculateCalories(
            minutes
        );

    const hydration =
        calculateHydration(
            minutes
        );

    const weeklyHours =
        calculateWeeklyHours(
            minutes
        );

    const training =
        generatePlan(
            goal
        );

    return {
        id: Date.now(),

        name,

        weight,

        height,

        minutes,

        goal,

        bmi,

        bmiCategory:
            getBMICategory(
                bmi
            ),

        calories,

        hydration,

        weeklyHours,

        rides:
            training.rides,

        recommendation:
            training.recommendation,

        intensity:
            getIntensityLevel(
                minutes
            ),

        recovery:
            getRecoveryRecommendation(
                minutes
            ),

        fitnessScore:
            calculateFitnessScore(
                bmi,
                minutes
            ),

        created:
            new Date()
                .toLocaleDateString()
    };
}