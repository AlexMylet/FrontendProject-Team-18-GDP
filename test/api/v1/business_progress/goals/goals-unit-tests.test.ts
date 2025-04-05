import { goal_storage, get_goals_from_storage } from "../../../../../src/api/v1/business_progress/goals-storage";

jest.mock("../../../../../src/api/v1/business_progress/calculate_current_progress");

test('add new goals', () => {
    expect(goal_storage.get("0")).toStrictEqual([]);
    const the_goal = {
        name: "Test Goal", unit: "items", target: 15,
        id: "000-000", goal_or_quest: "Goal"
    } as const;
    const the_second_goal = {
        name: "Test Goal 2", unit: "$", target: 14.5,
        id: "000-001", goal_or_quest: "Goal"
    } as const;
    goal_storage.add("0", the_goal);
    expect(goal_storage.get("0")).toStrictEqual([the_goal]);
    goal_storage.add("0", the_second_goal);
    const res_2 = goal_storage.get("0");
    expect(res_2).toContainEqual(the_goal);
    expect(res_2).toContainEqual(the_second_goal);
    expect(res_2.length).toBe(2);
});

test('remove goals', () => {
    expect(goal_storage.get("1")).toStrictEqual([]);
    const the_goal = {
        name: "Test Goal", unit: "items", target: 15,
        id: "000-000", goal_or_quest: "Goal"
    } as const;
    const the_second_goal = {
        name: "Test Goal 2", unit: "$", target: 14.5,
        id: "000-001", goal_or_quest: "Goal"
    } as const;
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

import { AccessToken, UUID, new_UUID, get_user_from_access_token, UserID } from "../../../../../src/api/common";

jest.mock("../../../../../src/api/common");


test('get goals from storage', () => {
    expect(goal_storage.get("2")).toStrictEqual([]);
    const the_goal = {
        name: "Test Goal", unit: "items", target: 15,
        id: "000-000", goal_or_quest: "Goal"
    } as const;
    const the_second_goal = {
        name: "Test Goal 2", unit: "$", target: 14.5,
        id: "000-001", goal_or_quest: "Goal"
    } as const;
    goal_storage.add("2", the_goal);
    goal_storage.add("2", the_second_goal);
    (get_user_from_access_token as jest.Mock).mockReturnValue("2");

    const result = get_goals_from_storage("0002", goal_storage);

    const the_goal_with_value = {
        name: "Test Goal", unit: "items", target: 15,
        id: "000-000", goal_or_quest: "Goal", current_progress: 2
    };
    const the_second_goal_with_value = {
        name: "Test Goal 2", unit: "$", target: 14.5,
        id: "000-001", goal_or_quest: "Goal", current_progress: 3
    };

    expect(result).toContainEqual(the_goal_with_value);
    expect(result).toContainEqual(the_second_goal_with_value);
    expect(result.length).toBe(2);
});
