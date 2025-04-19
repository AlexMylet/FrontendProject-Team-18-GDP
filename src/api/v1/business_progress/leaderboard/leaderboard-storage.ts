import { UUID, UserID } from "../../../common";

import {
  Leaderboard,
  LeaderboardDiscovery,
  LeaderboardStorage,
  OptIn,
} from "./leaderboard-types.ts";

import {
  mock_leaderboard,
  mock_leaderboard_discovery,
  mock_opt_in,
} from "./mock_data.ts";

const leaderboard_storage: LeaderboardStorage = mock_leaderboard;
const leaderboard_discovery: LeaderboardDiscovery = mock_leaderboard_discovery;
const opt_in: OptIn = mock_opt_in;

function set_opt_in(user_id: UserID, preference: boolean) {
  opt_in[user_id] = preference;
}

function clean_leaderboard(leaderboard: Leaderboard): Leaderboard {
  return leaderboard.filter((entry) => opt_in[entry.user_id]);
}
function get_leaderboard_from_storage(
  id: UUID,
  max_length: number,
): Leaderboard {
  const initial = leaderboard_storage[id];
  const clean = clean_leaderboard(initial);
  return clean.slice(0, max_length);
}

export { get_leaderboard_from_storage, set_opt_in, leaderboard_discovery };
