# Get Chatbox

Method: `POST`

Endpoint: `/api/v1/chat/get`

Request:

```json
{
  "access_token": access_token,
  "uuid": UUID,
}
```

Success Response:

```json
{
  "success": true,
  "updated_chat_list": Array[{
    "uuid": UUID,
    "name": string
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
