# Leaderboard Discovery

Method: `POST`

Endpoint: `/api/v1/business_progress/leaderboard/discovery`

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
  "leaderboard": Array[{
    "leaderboard_id": UUID,
    "name": string,
    "description": string,
    "category": string, // e,g, "England", "Financial", etc.
    "unit": string
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
