# Add New Goal

Method: `POST`

Endpoint: `/api/v1/business_progress/goals/add`

Request:

```json
{
  "access_token": access_token,
  "goal": {
    "name": string,
    "unit": string,
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
      "goal_or_quest": "Goal",
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
