# Get Notification List

Method: `POST`

Endpoint: `/api/v1/notification/list`

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
  "notification_list": Array[{
    "uuid": UUID,
    "name": string,
    "content": bool,
    "date": date
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
