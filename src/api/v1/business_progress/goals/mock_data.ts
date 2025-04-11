import { UserID } from "../../../common";

import { Award, StoredGoal } from "./goals-types";

const mock_goals: Record<UserID, StoredGoal[]> = {
  TEST_USER_ID: [
    {
      name: "Sales",
      unit: "items",
      target: 20000,
      id: "TESTG0",
      goal_or_quest: "Goal",
    },
    {
      name: "Profit",
      unit: "£",
      target: 1000,
      id: "TESTG1",
      goal_or_quest: "Goal",
    },
  ],
};

const mock_quests: Record<UserID, StoredGoal[]> = {
  TEST_USER_ID: [
    {
      name: "New customers today",
      unit: "customers",
      target: 2,
      id: "TESTQ0",
      goal_or_quest: "Quest",
    },
    {
      name: "Revenue today",
      unit: "£",
      target: 100,
      id: "TESTQ1",
      goal_or_quest: "Quest",
    },
  ],
};

const mock_awards: Record<UserID, Award[]> = {
  TEST_USER_ID: [
    {
      name: "Connect your data",
      description: "You connected your business data to platform",
      achieved_date: "2025-04-11",
      id: "TESTA0",
    },
    {
      name: "View a leaderboard",
      description: "You viewed a leaderboard to compare against your peers",
      achieved_date: "2025-04-10",
      id: "TESTA1",
    },
  ],
};

export { mock_goals, mock_quests, mock_awards };
