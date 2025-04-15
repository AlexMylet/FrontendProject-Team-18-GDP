import { UUID, UserID } from "../../../common";

interface Streak {
  id: UUID;
  name: string;
  streak: number;
}

interface hasID<R> {
  id: R;
}

interface Storage<T extends hasID<R>, R> {
  get: (userID: UserID) => T[];
}

export type { Streak, Storage, hasID };
