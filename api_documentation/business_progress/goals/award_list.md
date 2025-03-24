# Awards List

Method: `POST`

Endpoint: `/api/v1/business_progress/awards/list`

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
  "awards": Array[{
    "id": UUID,
    "name": string,
    "description": string,
    "achieved_date": string // YYYY-MM-DD
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
