import request from "supertest";

import app from "../../../../../src/api/api";

import {
  get_user_from_access_token,
  new_UUID,
} from "../../../../../src/api/common";

jest.mock("../../../../../src/api/common");
jest.mock(
  "../../../../../src/api/v1/business_progress/goals/calculate_current_progress",
);

const the_goal = {
  name: "Test Goal",
  unit: "items",
  target: 15,
};
const the_second_goal = {
  name: "Test Goal 2",
  unit: "$",
  target: 14.5,
};

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

const the_goal_editted = {
  name: "Test Goal (but editted)",
  unit: "items sold",
  target: 17,
};
const the_goal_with_progress_editted = {
  name: "Test Goal (but editted)",
  unit: "items sold",
  target: 17,
  id: "000-000",
  goal_or_quest: "Goal",
  current_progress: 2,
};

test("goal_list", async () => {
  (get_user_from_access_token as jest.Mock).mockReturnValueOnce("1001");
  const response = await request(app)
    .post("/api/v1/business_progress/goals/goal_list")
    .send({ access_token: "1001" });
  expect(response.status).toBe(200);
  expect(response.body.success).toBeTruthy();
  expect(response.body.goals).toStrictEqual([]);
});

// Error tests - see goals-api-no-mocks.test.ts (Invalid Access Token)
// Note - not testing what happens if API caller doesn't provide a value

test("add goals", async () => {
  (get_user_from_access_token as jest.Mock).mockReturnValue("1002");
  (new_UUID as jest.Mock)
    .mockReturnValueOnce("000-000")
    .mockReturnValueOnce("000-001");
  const response = await request(app)
    .post("/api/v1/business_progress/goals/add")
    .send({ access_token: "1002", goal: the_goal });
  expect(response.status).toBe(200);
  expect(response.body.success).toBeTruthy();
  expect(response.body.updated_goals).toStrictEqual([the_goal_with_progress]);

  const second_reponse = await request(app)
    .post("/api/v1/business_progress/goals/add")
    .send({ access_token: "1002", goal: the_second_goal });
  expect(second_reponse.status).toBe(200);
  expect(second_reponse.body.success).toBeTruthy();
  expect(second_reponse.body.updated_goals).toContainEqual(
    the_goal_with_progress,
  );
  expect(second_reponse.body.updated_goals).toContainEqual(
    the_second_goal_with_progress,
  );
  expect(second_reponse.body.updated_goals.length).toBe(2);
});

// Error tests - see goals-api-no-mocks.test.ts (Invalid Access Token)
// Note - not testing what happens if API caller doesn't provide a value

test("edit goals", async () => {
  // Add two goals
  (get_user_from_access_token as jest.Mock).mockReturnValue("1003");
  (new_UUID as jest.Mock)
    .mockReturnValueOnce("000-000")
    .mockReturnValueOnce("000-001");
  const response = await request(app)
    .post("/api/v1/business_progress/goals/add")
    .send({ access_token: "1003", goal: the_goal });
  expect(response.status).toBe(200);
  expect(response.body.success).toBeTruthy();
  expect(response.body.updated_goals).toStrictEqual([the_goal_with_progress]);

  const second_reponse = await request(app)
    .post("/api/v1/business_progress/goals/add")
    .send({ access_token: "1003", goal: the_second_goal });
  expect(second_reponse.status).toBe(200);
  expect(second_reponse.body.success).toBeTruthy();
  expect(second_reponse.body.updated_goals).toContainEqual(
    the_goal_with_progress,
  );
  expect(second_reponse.body.updated_goals).toContainEqual(
    the_second_goal_with_progress,
  );
  expect(second_reponse.body.updated_goals.length).toBe(2);

  // edit goal 000-000
  const third_reponse = await request(app)
    .post("/api/v1/business_progress/goals/edit")
    .send({
      access_token: "1003",
      goal_uuid: "000-000",
      updated_goal: the_goal_editted,
    });
  expect(third_reponse.status).toBe(200);
  expect(third_reponse.body.success).toBeTruthy();
  expect(third_reponse.body.updated_goals).toContainEqual(
    the_goal_with_progress_editted,
  );
  expect(third_reponse.body.updated_goals).toContainEqual(
    the_second_goal_with_progress,
  );
  expect(third_reponse.body.updated_goals.length).toBe(2);
});

// Error tests - see also goals-api-no-mocks.test.ts (Invalid Access Token)
// Note - not testing what happens if API caller doesn't provide a value

test("edit non-existent goal", async () => {
  (get_user_from_access_token as jest.Mock).mockReturnValue("1013");
  const response = await request(app)
    .post("/api/v1/business_progress/goals/edit")
    .send({
      access_token: "1013",
      goal_uuid: "000-000",
      updated_goal: the_goal,
    });
  expect(response.status).toBe(200);
  expect(response.body.success).toBeFalsy();
  expect(response.body.failed_msg).toBe("Goal does not exist");
});

test("remove goals", async () => {
  (get_user_from_access_token as jest.Mock).mockReturnValue("1004");
  (new_UUID as jest.Mock)
    .mockReturnValueOnce("000-000")
    .mockReturnValueOnce("000-001");
  const response = await request(app)
    .post("/api/v1/business_progress/goals/add")
    .send({ access_token: "1004", goal: the_goal });
  expect(response.status).toBe(200);
  expect(response.body.success).toBeTruthy();
  expect(response.body.updated_goals).toStrictEqual([the_goal_with_progress]);

  const second_reponse = await request(app)
    .post("/api/v1/business_progress/goals/add")
    .send({ access_token: "1004", goal: the_second_goal });
  expect(second_reponse.status).toBe(200);
  expect(second_reponse.body.success).toBeTruthy();
  expect(second_reponse.body.updated_goals).toContainEqual(
    the_goal_with_progress,
  );
  expect(second_reponse.body.updated_goals).toContainEqual(
    the_second_goal_with_progress,
  );
  expect(second_reponse.body.updated_goals.length).toBe(2);

  const third_response = await request(app)
    .post("/api/v1/business_progress/goals/remove")
    .send({ access_token: "1004", goal_uuid: "000-000" });

  expect(third_response.status).toBe(200);
  expect(third_response.body.success).toBeTruthy();
  expect(third_response.body.updated_goals).toStrictEqual([
    the_second_goal_with_progress,
  ]);
});

// Error tests - see also goals-api-no-mocks.test.ts (Invalid Access Token)
// Note - not testing what happens if API caller doesn't provide a value

test("remove non-existent goal", async () => {
  (get_user_from_access_token as jest.Mock).mockReturnValue("1014");
  const response = await request(app)
    .post("/api/v1/business_progress/goals/remove")
    .send({
      access_token: "1014",
      goal_uuid: "000-000",
      updated_goal: the_goal,
    });
  expect(response.status).toBe(200);
  expect(response.body.success).toBeFalsy();
  expect(response.body.failed_msg).toBe("Goal does not exist");
});

test("list quests", async () => {
  (get_user_from_access_token as jest.Mock).mockReturnValue("1005");
  const response = await request(app)
    .post("/api/v1/business_progress/quests/list")
    .send({ access_token: "1005" });

  expect(response.status).toBe(200);
  expect(response.body.success).toBeTruthy();
  expect(response.body.goals).toStrictEqual([]);
});

// Error tests - see goals-api-no-mocks.test.ts (Invalid Access Token)
// Note - not testing what happens if API caller doesn't provide a value

test("list awards", async () => {
  (get_user_from_access_token as jest.Mock).mockReturnValue("1006");

  const response = await request(app)
    .post("/api/v1/business_progress/awards/list")
    .send({ access_token: "1006" });
  expect(response.status).toBe(200);
  expect(response.body.success).toBeTruthy();
  expect(response.body.awards).toStrictEqual([]);
});

// Error tests - see goals-api-no-mocks.test.ts (Invalid Access Token)
// Note - not testing what happens if API caller doesn't provide a value
