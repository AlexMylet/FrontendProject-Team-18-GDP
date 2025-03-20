# User Login

Method: `POST`

Endpoint: `/api/v1/auth/logout`

Request:

```json
{
  "success": true,
  "refresh_token": refresh_token
}
```

Success Response:

```json
{
  "success": false,
  "failed_msg": string
}
```
