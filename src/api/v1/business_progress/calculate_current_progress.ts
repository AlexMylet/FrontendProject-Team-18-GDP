import { StoredGoal, Goal } from "./goals-types";

// TODO: this function should probably do some caching!
// If, say, timestamp of business data has not changed
// and the goal has not been updated, then cache.
function calculate_current_progress(goal: StoredGoal): Goal {
    // throw("NotImplemented (calculate_current_progress)")
    const current_progress = 0; // TODO: actual mocking
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
