import { UserID } from "../../../common";

import { Streak } from "./streaks-types";

const mock_streaks: Record<UserID, Streak[]> = {
  TEST_USER_ID: [
    {
      id: "TESTS0",
      name: "Sales",
      streak: 20,
    },
    {
      id: "TESTS1",
      name: "Profit",
      streak: 5,
    },
  ],
};

export { mock_streaks };
