# User Registration

Method: `POST`

Endpoint: `/api/v1/auth/register`

Request:

```json
{
  "username": string,
  "email": string,
  "password": string,
  "first_name": string,
  "last_name": string
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
  "failed_msg": string //e.g. "UserAlreadyExists"
}
```
