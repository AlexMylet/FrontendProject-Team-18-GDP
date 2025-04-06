export type AccessToken = string;
export type UUID = string;
export type UserID = UUID;
export function new_UUID(): UUID {
  throw Error("NotImplemented (new_UUID)");
}
export function get_user_from_access_token(access_token: AccessToken): UserID {
  throw Error("NotImplemented (get_user_from_access_token)");
}
