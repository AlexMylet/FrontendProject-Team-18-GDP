# AI Chat

Data model:

```json
// Chat
{
    "uuid": UUID,
    name: string,
}

// Chatbox
{
    "uuid": UUID,
    sender: string, // e.g. "User" or "AI"
    content: string,
}
```

Links to API details:

- [Get Chat List](./chat_list.md)

- [Get Chat](./get_chat.md)
- [Add Chat](./add_chat.md)
- [Remove Chat](./remove_chat.md)
- [Edit Chat Name](./edit_chat_name.md)

- [Add Chatbox](./add_chatbox.md)
- [Edit Chatbox](./edit_chatbox.md)
