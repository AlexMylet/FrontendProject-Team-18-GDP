# Leaderboard List

Method: `POST`

Endpoint: `/api/v1/business_progress/leaderboard/list`

Request:

```json
{
  "access_token": access_token,
  "opt_in": bool, // e.g. default false
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
  "failed_msg": string //e.g. "IncorrectAccessToken"
}
```
