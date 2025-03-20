# Streak List

Method: `POST`

Endpoint: `/api/v1/business_progress/streak/list`

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
  "goals": Array[{
    "id": UUID,
    "name": string,
    "streaks": int
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
