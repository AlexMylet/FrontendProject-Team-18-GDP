# Goals List

Method: `POST`

Endpoint: `/api/v1/business_progress/goals/list`

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
