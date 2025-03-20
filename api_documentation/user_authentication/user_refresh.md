# User Login

Method: `POST`

Endpoint: `/api/v1/auth/refresh`

Request:

```json
{
  "refresh_token": refresh_token
}
```

Success Response:

```json
{
  "success": true,
  "access_token": access_token,
  "expires_in": int
}
```

Failed Response:

```json
{
  "success": false,
  "failed_msg": string //e.g. "IncorrectRefreshToken"
}
```
