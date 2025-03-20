# Edit Goal

Method: `POST`

Endpoint: `/api/v1/business_progress/goals/edit`

Request:

```json
{
  "access_token": access_token,
  "goal_uuid": UUID,
  "updated_goal": {
    "name": string,
    "unit": string, // e.g. "Revenue"
    "target": float
  }
}
```

Success Response:

```json
{
  "success": true,
  "updated_goals": Array[{
      "id": UUID,
      "name": string,
      "goal_or_quest": string, // "Goal" | "Quest"
      "unit": string,
      "target": float,
      "current_progress": float,
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
