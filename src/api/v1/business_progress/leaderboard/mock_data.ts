import {
  LeaderboardStorage,
  LeaderboardDiscovery,
  OptIn,
} from "./leaderboard-types";

// Mock Leaderboard
const mock_leaderboard: LeaderboardStorage = {
  TESTL0: [
    { user_id: "TEST_ALICE", username: "Alice", value: 1200 },
    { user_id: "TEST_BOB", username: "Bob", value: 1100 },
    { user_id: "TEST_CHARLIE", username: "Charlie", value: 950 },
    { user_id: "TEST_USER_ID", username: "Me", value: 900 },
  ],
  TESTL1: [
    { user_id: "TEST_BOB", username: "Bob", value: 1500 },
    { user_id: "TEST_ALICE", username: "Alice", value: 1300 },
    { user_id: "TEST_CHARLIE", username: "Charlie", value: 900 },
    { user_id: "TEST_USER_ID", username: "Me", value: 700 },
  ],
};

// Mock Leaderboard Discovery Array
const mock_leaderboard_discovery: LeaderboardDiscovery = [
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

const mock_opt_in: OptIn = {
  TEST_ALICE: true,
  TEST_BOB: true,
  TEST_CHARLIE: false,
};

export { mock_leaderboard, mock_leaderboard_discovery, mock_opt_in };
