# User Registration

Method: `POST`

Endpoint: `/api/v1/auth/update_password`

Request:

```json
{
  "access_token": string,
  "old_password": string,
  "new_password": string,
}
```

Success Response:

```json
{
  "success": true
}
```

Failed Response:

```json
{
  "success": false,
  "failed_msg": string //e.g. "IncorrectOldPassword"
}
```
