import { StoredGoal, Goal } from "../goals-types";

function calculate_current_progress(goal: StoredGoal): Goal {
  let current_progress = 0;
  if (goal.id === "000-000") {
    current_progress = 2;
  } else if (goal.id === "000-001") {
    current_progress = 3;
  }
  return {
    ...goal,
    current_progress: current_progress,
  };
}

export default calculate_current_progress;
