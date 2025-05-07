# Leaderboard List

Method: `POST`

Endpoint: `/api/v1/business_progress/leaderboard/get_preference`

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
  "opt_in": bool
}
```

Failed Response:

```json
{
  "success": false,
  "failed_msg": string //e.g. "IncorrectAccessToken"
}
```
