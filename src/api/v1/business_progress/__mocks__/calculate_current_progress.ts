import { StoredGoal, Goal } from "../goals-types";

function calculate_current_progress(goal: StoredGoal): Goal {
    let current_progress = 0;
    if (goal.id === "000-000") {
        current_progress = 2;
    } else if (goal.id === "000-001") {
        current_progress = 3;
    }
    return {
        name: goal.name,
        unit: goal.unit,
        target: goal.target,
        id: goal.id,
        goal_or_quest: goal.goal_or_quest,
        current_progress: current_progress,
    };
}

export default calculate_current_progress;