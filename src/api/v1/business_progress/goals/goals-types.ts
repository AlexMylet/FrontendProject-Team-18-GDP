import { UUID, UserID } from "../../../common";

interface PartialGoal {
  name: string;
  unit: string;
  target: number;
}

interface StoredGoal extends PartialGoal {
  id: UUID;
  goal_or_quest: "Goal" | "Quest";
}

interface Goal extends StoredGoal {
  current_progress: number;
}

interface Award {
  id: UUID;
  name: string;
  description: string;
  achieved_date: string; // YYYY-MM-DD
}

// Storage interaction
interface GoalStorage {
  get: (userID: UserID) => StoredGoal[];
  add: (userID: UserID, goal: StoredGoal) => void;
  remove: (userID: UserID, goal_UUID: UUID) => void;
}

export type { PartialGoal, StoredGoal, Goal, Award, GoalStorage };
