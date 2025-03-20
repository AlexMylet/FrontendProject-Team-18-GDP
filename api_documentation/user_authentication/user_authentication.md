# User Authentication

User will be logged in automatically after registration.

To avoid sending the user username/password every time in a user-specific request, a short-lived `access_token` is introduced, while a `update_token` (obtained when login) can retrieve the `access_token`.

Links to API details:

- [User Registration](./user_registration.md)
- [User Login](./user_login.md)
- [User Logout](./user_logout.md)
- [User Opened](./user_opened.md)
- [User Refresh](./user_refresh.md)
- [User Validation](./user_validation.md)
- [User Update Password](./user_update_password.md)
