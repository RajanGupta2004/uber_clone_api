## 🧠 Description

Registers a new user by saving their details to the MongoDB database.  
If the email already exists, the API will return an error.

---

## 📤 Request Body

| Field                | Type     | Required | Description                           |
| -------------------- | -------- | -------- | ------------------------------------- |
| `fullName.firstName` | `string` | ✅       | User's first name (min. 3 characters) |
| `fullName.lastName`  | `string` | ❌       | User's last name                      |
| `email`              | `string` | ✅       | User's email (must be unique)         |
| `password`           | `string` | ✅       | User's password (min. 6 characters)   |

### 🧾 Example JSON

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "mypassword123"
}
```
