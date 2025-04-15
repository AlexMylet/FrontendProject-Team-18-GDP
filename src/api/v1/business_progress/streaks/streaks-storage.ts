import {
  AccessToken,
  UUID,
  UserID,
  get_user_from_access_token,
} from "../../../common";

import { Streak, Storage, hasID } from "./streaks-types";

import { mock_streaks } from "./mock_data.ts";

function storage_factory<T extends hasID<R>, R>(
  storage_dictionary: Record<UserID, T[]>,
): Storage<T, R> {
  const streak_storage: Storage<T, R> = {
    get: (userID: UserID) => {
      const res = storage_dictionary[userID];
      if (res == null) {
        return [];
      } else {
        return res;
      }
    },
  };
  return streak_storage;
}

function get_streaks_from_storage(
  access_token: AccessToken,
  storage: Storage<Streak, UUID>,
): Streak[] {
  const the_streaks: Streak[] = storage.get(
    get_user_from_access_token(access_token),
  );
  return the_streaks;
}

const storage_dictionary: Record<UserID, Streak[]> = mock_streaks;
const streak_storage = storage_factory<Streak, UUID>(storage_dictionary);

function get_user_streaks(access_token: AccessToken): Streak[] {
  return get_streaks_from_storage(access_token, streak_storage);
}

export { get_user_streaks };
