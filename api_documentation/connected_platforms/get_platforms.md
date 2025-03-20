# Get Platform List

Method: `POST`

Endpoint: `/api/v1/connected_platforms/list`

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
  "platform_list": Array[{
    "uuid": UUID,
    "name": string,
    "is_connected": bool
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
