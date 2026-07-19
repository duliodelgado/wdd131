function getPlans() {

    return JSON.parse(
        localStorage.getItem(
            "plans"
        )
    ) || [];
}

function savePlan(plan) {

    const plans =
        getPlans();

    plans.push(plan);

    localStorage.setItem(
        "plans",
        JSON.stringify(plans)
    );
}