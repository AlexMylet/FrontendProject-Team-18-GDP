import { UUID } from "../../../common";
import { hasID } from "../../../common-storage";

interface PartialGoal {
  name: string;
  unit: string;
  target: number;
}

interface StoredGoal extends PartialGoal, hasID<UUID> {
  goal_or_quest: "Goal" | "Quest";
}

interface Goal extends StoredGoal {
  current_progress: number;
}

interface Award extends hasID<UUID> {
  name: string;
  description: string;
  achieved_date: string; // YYYY-MM-DD
}

export type { PartialGoal, StoredGoal, Goal, Award };
