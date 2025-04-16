import {
  AccessToken,
  UUID,
  UserID,
  get_user_from_access_token,
} from "../../../common";

import { storage_factory, Storage } from "../../../common-storage.ts";

import { Streak } from "./streaks-types";

import { mock_streaks } from "./mock_data.ts";

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
