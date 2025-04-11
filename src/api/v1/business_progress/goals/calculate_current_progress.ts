import { StoredGoal, Goal } from "./goals-types";

// TODO: this function should probably do some caching!
// If, say, timestamp of business data has not changed
// and the goal has not been updated, then cache.
function calculate_current_progress(goal: StoredGoal): Goal {
  let current_progress = 0;
  if (goal.id == "TESTG0") {
    current_progress = 15000;
  } else if (goal.id == "TESTG1") {
    current_progress = 300;
  } else if (goal.id == "TESTQ0") {
    current_progress = 0;
  } else if (goal.id == "TESTQ1") {
    current_progress = 12.34;
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
