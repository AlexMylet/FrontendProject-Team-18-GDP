# Get Chatbox

Method: `POST`

Endpoint: `/api/v1/chat/get`

Request:

```json
{
  "access_token": access_token,
  "uuid": UUID
}
```

Success Response:

```json
{
  "success": true,
  "history": Array[{
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
