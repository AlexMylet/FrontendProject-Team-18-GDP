import { UserID } from "./common";

interface hasID<R> {
  id: R;
}

interface Storage<T extends hasID<R>, R> {
  get: (userID: UserID) => T[];
  add: (userID: UserID, goal: T) => void;
  remove: (userID: UserID, goal_UUID: R) => void;
}

function storage_factory<T extends hasID<R>, R>(
  storage_dictionary: Record<UserID, T[]>,
): Storage<T, R> {
  const goal_storage: Storage<T, R> = {
    get: (userID: UserID) => {
      const res = storage_dictionary[userID];
      if (res == null) {
        return [];
      } else {
        return res;
      }
    },
    add: (userID: UserID, added_item: T) => {
      const the_entry = storage_dictionary[userID];
      if (the_entry == null) {
        storage_dictionary[userID] = [added_item];
      } else {
        the_entry.push(added_item);
        storage_dictionary[userID] = the_entry;
      }
    },
    remove: (userID: UserID, given_id: R) => {
      storage_dictionary[userID] = storage_dictionary[userID].filter(
        (goal) => goal.id !== given_id,
      );
    },
  };
  return goal_storage;
}

export type { Storage, hasID };

export { storage_factory };
