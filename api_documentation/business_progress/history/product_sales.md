# Product Sales History

Method: `POST`

Endpoint: `/api/v1/business_progress/history/product_sales`

Request:

```json
{
  "access_token": access_token,
  "start_date": string, // YYYY-MM-DD
  "end_date": string
}
```

Success Response:

```json
{
  "success": true,
  "product_sales": Array[{
    "date": string,
    "sales": Array[{
      "uuid": UUID,
      "product_name": product_name,
      "revenue": float
    }]
  }]
}
```

Failed Response:

```json
{
  "success": false,
  "failed_msg": string //e.g. "IncorrectAccessToken", "InvalidDateRange"
}
```
