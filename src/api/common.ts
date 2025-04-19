let current_uuid_number = 0;

const access_token_user_dictionary: Record<AccessToken, UserID> = {
  TEST_ACCESS_TOKEN: "TEST_USER_ID",
  TEST_ACCESS_TOKEN_ALICE: "TEST_ALICE",
  TEST_ACCESS_TOKEN_BOB: "TEST_BOB",
  TEST_ACCESS_TOKEN_CHARLIE: "TEST_CHARLIE",
};

export type AccessToken = string;
export type UUID = string;
export type UserID = UUID;
export function new_UUID(): UUID {
  const uuid = current_uuid_number.toString();
  current_uuid_number += 1;
  return uuid;
}
export function get_user_from_access_token(access_token: AccessToken): UserID {
  const user = access_token_user_dictionary[access_token];
  if (user == null) {
    throw new Error("Invalid Access Token");
  } else {
    return user;
  }
}
