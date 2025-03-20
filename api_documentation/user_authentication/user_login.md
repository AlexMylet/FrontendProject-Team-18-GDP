# User Login

Method: `POST`

Endpoint: `/api/v1/auth/login`

Request:

```json
{
  "username_or_email": string,
  "password": string,
}
```

Success Response:

```json
{
  "success": true,
  "access_token": access_token,
  "refresh_token": update_token,
  "expires_in": int
}
```

Failed Response:

```json
{
  "success": false,
  "failed_msg": string //e.g. "IncorrectUsernamePasswordPair"
}
```
