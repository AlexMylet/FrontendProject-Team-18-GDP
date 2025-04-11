import { UUID, UserID } from "../../../common";

interface PartialGoal {
  name: string;
  unit: string;
  target: number;
}

interface hasID<R> {
  id: R;
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

// Storage interaction
interface Storage<T extends hasID<R>, R> {
  get: (userID: UserID) => T[];
  add: (userID: UserID, goal: T) => void;
  remove: (userID: UserID, goal_UUID: R) => void;
}

export type { PartialGoal, StoredGoal, Goal, Award, Storage, hasID };
