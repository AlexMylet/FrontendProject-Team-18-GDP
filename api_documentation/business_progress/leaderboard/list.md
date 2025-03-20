# Leaderboard List

Method: `POST`

Endpoint: `/api/v1/business_progress/leaderboard/list`

Request:

```json
{
  "access_token": access_token,
  "leaderboard_id": UUID,
  "max_length": int
}
```

Success Response:

```json
{
  "success": true,
  "leaderboard": Array[{
    username: string,
    value: Any // e.g. revenue: float
  }]
}
```

Failed Response:

```json
{
  "success": false,
  "failed_msg": string //e.g. "IncorrectAccessToken"
}
```
