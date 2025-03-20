# User Opened

Method: `POST`

Endpoint: `/api/v1/auth/opened`

Request:

```json
{
  "access_token": access_token,
}
```

Success Response:

```json
{
  "success": true,
}
```

Failed Response:

```json
{
  "success": false,
  "failed_msg": string //e.g. "IncorrectAccessToken"
}
```
