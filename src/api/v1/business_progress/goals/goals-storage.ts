import {
  AccessToken,
  UUID,
  new_UUID,
  get_user_from_access_token,
  UserID,
} from "../../../common";

import {
  PartialGoal,
  StoredGoal,
  Goal,
  Award,
  GoalStorage,
} from "./goals-types";

import calculate_current_progress from "./calculate_current_progress";

function goal_storage_factory(
  goal_dictionary: Record<UserID, StoredGoal[]>,
): GoalStorage {
  const goal_storage: GoalStorage = {
    get: (userID: UserID) => {
      const res = goal_dictionary[userID];
      if (res == null) {
        return [];
      } else {
        return res;
      }
    },
    add: (userID: UserID, goal: StoredGoal) => {
      console.assert(goal.goal_or_quest === "Goal");
      const the_entry = goal_dictionary[userID];
      if (the_entry == null) {
        goal_dictionary[userID] = [goal];
      } else {
        the_entry.push(goal);
        goal_dictionary[userID] = the_entry;
      }
    },
    remove: (userID: UserID, goal_uuid: UUID) => {
      goal_dictionary[userID] = goal_dictionary[userID].filter(
        (goal) => goal.id !== goal_uuid,
      );
    },
  };
  return goal_storage;
}

const goal_dictionary: Record<UserID, StoredGoal[]> = {};
const goal_storage = goal_storage_factory(goal_dictionary);

const quest_dictionary: Record<UserID, StoredGoal[]> = {};
const quest_storage = goal_storage_factory(quest_dictionary);

function get_award_list(userID: UserID): Award[] {
  throw Error("NotImplemented (get_award_list)");
}

function get_goals_from_storage(
  access_token: AccessToken,
  storage: GoalStorage,
): Goal[] {
  const the_goals: StoredGoal[] = storage.get(
    get_user_from_access_token(access_token),
  );
  return the_goals.map((stored_goal) =>
    calculate_current_progress(stored_goal),
  );
}

function get_user_goals(access_token: AccessToken): Goal[] {
  return get_goals_from_storage(access_token, goal_storage);
}

function get_user_quests(access_token: AccessToken): Goal[] {
  return get_goals_from_storage(access_token, quest_storage);
}

function add_user_goal(
  access_token: AccessToken,
  added_goal: PartialGoal,
  existing_uuid: UUID | null = null,
): void {
  const id = existing_uuid === null ? new_UUID() : existing_uuid;
  const full_goal: StoredGoal = {
    name: added_goal.name,
    unit: added_goal.unit,
    target: added_goal.target,
    id: id,
    goal_or_quest: "Goal",
  };
  goal_storage.add(get_user_from_access_token(access_token), full_goal);
}

function remove_user_goal(access_token: AccessToken, goal_uuid: UUID): void {
  goal_storage.remove(get_user_from_access_token(access_token), goal_uuid);
}

export {
  add_user_goal,
  get_award_list,
  get_user_goals,
  get_user_quests,
  remove_user_goal,
};
// Those only export for testing
export { get_goals_from_storage, goal_storage, quest_storage };
