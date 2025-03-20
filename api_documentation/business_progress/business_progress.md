# Business Progress

Goal/Quest data model

```json
{
    "id": UUID,
    "name": string,
    "goal_or_quest": string, // "Goal" | "Quest"
    "unit": string,
    "target": float,
    "current_progress": float,
}
```

Streak data model

```json
{
    "id": UUID,
    "name": string,
    "streaks": int
}
```

Links to API details:

- [Product Sales History](./history/product_sales.md)

- [Product Sales Forecast](./forecast/product_sales.md)

- [Get Goal List](./goals/list.md)
- [Add New Goal](./goals/add.md)
- [Edit Goal](./goals/edit.md)
- [Remove Goal](./goals/remove.md)
- [Get Award List](./goals/award_list.md)

- [Get Leaderboard](./leaderboard/list.md)
