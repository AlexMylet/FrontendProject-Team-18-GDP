// Test that the mock_data is correctly returned
// for quests awards, where API has no way to add,
// and the default is empty

import request from "supertest";

import app from "../../../../../src/api/api";

const quest_one_with_progress = {
  name: "New customers today",
  unit: "customers",
  target: 2,
  id: "TESTQ0",
  goal_or_quest: "Quest",
  current_progress: 0,
};
const quest_two_with_progress = {
  name: "Revenue today",
  unit: "£",
  target: 100,
  id: "TESTQ1",
  goal_or_quest: "Quest",
  current_progress: 12.34,
};

test("quests - mock data", async () => {
  const response = await request(app)
    .post("/api/v1/business_progress/quests/list")
    .send({ access_token: "TEST_ACCESS_TOKEN" });

  expect(response.status).toBe(200);
  expect(response.body.success).toBeTruthy();
  expect(response.body.goals).toContainEqual(quest_one_with_progress);
  expect(response.body.goals).toContainEqual(quest_two_with_progress);
  expect(response.body.goals.length).toBe(2);
});

const award_one = {
  name: "Connect your data",
  description: "You connected your business data to platform",
  achieved_date: "2025-04-11",
  id: "TESTA0",
};
const award_two = {
  name: "View a leaderboard",
  description: "You viewed a leaderboard to compare against your peers",
  achieved_date: "2025-04-10",
  id: "TESTA1",
};

test("awards - mock data", async () => {
  const response = await request(app)
    .post("/api/v1/business_progress/awards/list")
    .send({ access_token: "TEST_ACCESS_TOKEN" });

  expect(response.status).toBe(200);
  expect(response.body.success).toBeTruthy();
  expect(response.body.awards).toContainEqual(award_one);
  expect(response.body.awards).toContainEqual(award_two);
  expect(response.body.awards.length).toBe(2);
});
