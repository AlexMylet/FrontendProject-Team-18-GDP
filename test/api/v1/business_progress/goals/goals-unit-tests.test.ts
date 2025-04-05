process.env['NODE_DEV'] = 'TEST';

let goals = require("../../../../../src/api/v1/business_progress/goals")
const goal_storage = goals.goal_storage

test('add new goals', () => {
    expect(goal_storage.get("0")).toStrictEqual([])
    const the_goal = {
        name: "Test Goal", unit: "items", target: 15,
        id: "000-000", goal_or_quest: "Goal"
    }
    const the_second_goal = {
        name: "Test Goal 2", unit: "$", target: 14.5,
        id: "000-001", goal_or_quest: "Goal"
    }
    goal_storage.add("0", the_goal)
    expect(goal_storage.get("0")).toStrictEqual([the_goal])
    goal_storage.add("0", the_second_goal)
    const res_2 = goal_storage.get("0")
    expect(res_2).toContain(the_goal)
    expect(res_2).toContain(the_second_goal)
    expect(res_2.length).toBe(2)
});

test('remove goals', () => {
    expect(goal_storage.get("1")).toStrictEqual([])
    const the_goal = {
        name: "Test Goal", unit: "items", target: 15,
        id: "000-002", goal_or_quest: "Goal"
    }
    const the_second_goal = {
        name: "Test Goal 2", unit: "$", target: 14.5,
        id: "000-003", goal_or_quest: "Goal"
    }
    goal_storage.add("1", the_goal)
    goal_storage.add("1", the_second_goal)

    goal_storage.remove("1", "000-003")

    const res = goal_storage.get("1")
    expect(res).toContain(the_goal)
    expect(res.length).toBe(1)
});
