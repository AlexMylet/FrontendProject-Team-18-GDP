# Get Chatbox

Method: `POST`

Endpoint: `/api/v1/chat/get`

Request:

```json
{
  "access_token": access_token,
  "uuid": UUID,
  "new_content": string
}
```

Success Response:

```json
{
  "success": true,
  "updated_chatbox_list": Array[{
    "uuid": UUID,
    "sender": string, // e.g. "User" or "AI"
    "content": string
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
