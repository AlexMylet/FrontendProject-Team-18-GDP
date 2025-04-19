import { UUID, UserID } from "../../../common";

interface LeaderboardEntry {
  user_id: UserID;
  username: string;
  value: number;
}

type Leaderboard = LeaderboardEntry[];
type LeaderboardStorage = Record<UUID, LeaderboardEntry[]>;

interface LeaderboardDiscoveryEntry {
  leaderboard_id: UUID;
  name: string;
  description: string;
  category: string; // e,g, "England", "Financial", etc.
  unit: string;
}

type LeaderboardDiscovery = LeaderboardDiscoveryEntry[];

type OptIn = Record<UserID, boolean>;

export type { Leaderboard, LeaderboardStorage, LeaderboardDiscovery, OptIn };
