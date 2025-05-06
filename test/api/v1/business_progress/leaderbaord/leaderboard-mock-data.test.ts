// Test that the mock_data is correctly returned, for leaderbaords
import request from "supertest";

import app from "../../../../../src/api/api";

const mock_leaderboard_discovery = [
  {
    leaderboard_id: "TESTL0",
    name: "Sales",
    description: "Leaderboard of total units sold",
    category: "England",
    unit: "units sold",
  },
  {
    leaderboard_id: "TESTL1",
    name: "Profit",
    description: "Tracks the highest earnings across platforms",
    category: "All",
    unit: "GBP",
  },
];

test("leaderboard-discovery", async () => {
  const response = await request(app)
    .post("/api/v1/business_progress/leaderboard/discovery")
    .send({ access_token: "TEST_ACCESS_TOKEN" });
  expect(response.body.success).toBeTruthy();
  expect(response.body.leaderboard).toEqual(mock_leaderboard_discovery);
});

const mock_leaderboard = {
  TESTL0: [
    { user_id: "TEST_ALICE", username: "Alice", value: 1200 },
    { user_id: "TEST_BOB", username: "Bob", value: 1100 },
  ],
  TESTL1: [
    { user_id: "TEST_BOB", username: "Bob", value: 1500 },
    { user_id: "TEST_ALICE", username: "Alice", value: 1300 },
  ],
};

["TESTL0", "TESTL1"].forEach((id) => {
  test("leaderboard-list " + id, async () => {
    const response = await request(app)
      .post("/api/v1/business_progress/leaderboard/list")
      .send({
        access_token: "TEST_ACCESS_TOKEN",
        leaderboard_id: id,
        max_length: 3,
      });
    expect(response.body.success).toBeTruthy();
    expect(response.body.streaks).toEqual(mock_leaderboard[id]);
  });
});
