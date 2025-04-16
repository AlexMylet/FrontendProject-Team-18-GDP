import {
  AccessToken,
  UUID,
  new_UUID,
  get_user_from_access_token,
  UserID,
} from "../../../common";

import { storage_factory, Storage } from "../../../common-storage";

import { PartialGoal, StoredGoal, Goal, Award } from "./goals-types";

import calculate_current_progress from "./calculate_current_progress";

import { mock_goals, mock_quests, mock_awards } from "./mock_data";

const storage_dictionary: Record<UserID, StoredGoal[]> = mock_goals;
const goal_storage = storage_factory<StoredGoal, UUID>(storage_dictionary);

const quest_dictionary: Record<UserID, StoredGoal[]> = mock_quests;
const quest_storage = storage_factory<StoredGoal, UUID>(quest_dictionary);

const award_dictionary: Record<UserID, Award[]> = mock_awards;
const award_storage = storage_factory<Award, UUID>(award_dictionary);

function get_award_list(userID: UserID): Award[] {
  return award_storage.get(userID);
}

function get_goals_from_storage(
  access_token: AccessToken,
  storage: Storage<StoredGoal, UUID>,
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
    ...added_goal,
    id: id,
    goal_or_quest: "Goal",
  };
  goal_storage.add(get_user_from_access_token(access_token), full_goal);
}

function remove_user_goal(access_token: AccessToken, goal_uuid: UUID): void {
  // Check goal does already exist
  const user = get_user_from_access_token(access_token);
  if (!goal_storage.get(user).some((goal) => goal.id === goal_uuid)) {
    throw new Error("Goal does not exist");
  }
  goal_storage.remove(user, goal_uuid);
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
