import {
  goal_storage,
  get_goals_from_storage,
  get_user_goals,
  add_user_goal,
  remove_user_goal,
} from "../../../../../src/api/v1/business_progress/goals/goals-storage";

jest.mock(
  "../../../../../src/api/v1/business_progress/goals/calculate_current_progress",
);

const the_goal = {
  name: "Test Goal",
  unit: "items",
  target: 15,
  id: "000-000",
  goal_or_quest: "Goal",
} as const;
const the_second_goal = {
  name: "Test Goal 2",
  unit: "$",
  target: 14.5,
  id: "000-001",
  goal_or_quest: "Goal",
} as const;

const the_goal_with_progress = {
  name: "Test Goal",
  unit: "items",
  target: 15,
  id: "000-000",
  goal_or_quest: "Goal",
  current_progress: 2,
};
const the_second_goal_with_progress = {
  name: "Test Goal 2",
  unit: "$",
  target: 14.5,
  id: "000-001",
  goal_or_quest: "Goal",
  current_progress: 3,
};

const the_partial_goal = {
  name: "Test Goal",
  unit: "items",
  target: 15,
};
const the_second_partial_goal = {
  name: "Test Goal 2",
  unit: "$",
  target: 14.5,
};

test("add new goals", () => {
  expect(goal_storage.get("0")).toStrictEqual([]);
  goal_storage.add("0", the_goal);
  expect(goal_storage.get("0")).toStrictEqual([the_goal]);
  goal_storage.add("0", the_second_goal);
  const res_2 = goal_storage.get("0");
  expect(res_2).toContainEqual(the_goal);
  expect(res_2).toContainEqual(the_second_goal);
  expect(res_2.length).toBe(2);
});

test("remove goals", () => {
  expect(goal_storage.get("1")).toStrictEqual([]);
  goal_storage.add("1", the_goal);
  goal_storage.add("1", the_second_goal);

  goal_storage.remove("1", "000-001");

  const res = goal_storage.get("1");
  expect(res).toContainEqual(the_goal);
  expect(res.length).toBe(1);
});

// TODO - test calculate_current_progress (if end up doing calculation)
// This would probably be in a separate file as it is mocked here!

// Test get_goals_from_storage with mocked calculate_current_progress, get_user_from_access_token

import {
  AccessToken,
  UUID,
  new_UUID,
  get_user_from_access_token,
  UserID,
} from "../../../../../src/api/common";

jest.mock("../../../../../src/api/common");

test("get goals from storage", () => {
  expect(goal_storage.get("2")).toStrictEqual([]);
  goal_storage.add("2", the_goal);
  goal_storage.add("2", the_second_goal);
  (get_user_from_access_token as jest.Mock).mockReturnValue("2");

  const result = get_goals_from_storage("0002", goal_storage);

  expect(result).toContainEqual(the_goal_with_progress);
  expect(result).toContainEqual(the_second_goal_with_progress);
  expect(result.length).toBe(2);
});

test("get user goals", () => {
  expect(goal_storage.get("3")).toStrictEqual([]);
  goal_storage.add("3", the_goal);
  goal_storage.add("3", the_second_goal);
  (get_user_from_access_token as jest.Mock).mockReturnValue("3");

  const result = get_user_goals("0003");

  expect(result).toContainEqual(the_goal_with_progress);
  expect(result).toContainEqual(the_second_goal_with_progress);
  expect(result.length).toBe(2);
});

test("add user goal", () => {
  expect(goal_storage.get("4")).toStrictEqual([]);
  (get_user_from_access_token as jest.Mock).mockReturnValue("4");
  (new_UUID as jest.Mock)
    .mockReturnValueOnce("000-000")
    .mockReturnValueOnce("000-001");
  add_user_goal("0004", the_partial_goal);
  add_user_goal("0004", the_second_partial_goal);

  const result = goal_storage.get("4");

  expect(result).toContainEqual(the_goal);
  expect(result).toContainEqual(the_second_goal);
  expect(result.length).toBe(2);
});

test("add goal with given UUID", () => {
  expect(goal_storage.get("5")).toStrictEqual([]);
  (get_user_from_access_token as jest.Mock).mockReturnValue("5");
  add_user_goal("0005", the_partial_goal, "000-000");
  add_user_goal("0005", the_second_partial_goal, "000-001");

  const result = goal_storage.get("5");

  expect(result).toContainEqual(the_goal);
  expect(result).toContainEqual(the_second_goal);
  expect(result.length).toBe(2);
});

test("remove user goal", () => {
  expect(goal_storage.get("6")).toStrictEqual([]);
  (get_user_from_access_token as jest.Mock).mockReturnValue("6");
  goal_storage.add("6", the_goal);
  goal_storage.add("6", the_second_goal);

  (get_user_from_access_token as jest.Mock).mockReturnValue("6");

  remove_user_goal("0006", "000-000");

  const result = goal_storage.get("6");

  expect(result).toContainEqual(the_second_goal);
  expect(result.length).toBe(1);
});
