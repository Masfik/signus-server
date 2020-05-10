# Signus Server

This is a simple backend server and forms part of the Signus chatting application and is built on top of Node.

Signus has been created for educational purposes and is part of a **Distributed Systems** module coursework.

## Setup

### Configure server address

We recommend creating a config.json file in the root directory of this repo and configure the following lines:

```
{
  "web_server_port": 3000,
  "database": {
    "host": "YOUR_HOST_IP_OR_DOMAIN",
    "username": "YOUR_MONGODB_USER_IF_CONFIGURED",
    "password": "YOUR_USER_PASSWORD",
    "database": "YOUR_DB_NAME"
  }
}
```

## Configured Routes

- `/user` ➔ Searches for specific user in the database, requires a token in the header and a `query` parameter
  - `/user/chats` ➔ Adds a chat to the recipient list of the user in mongodb. Requires a usernames in the query params (for a future use case)
- `/login` ➔ Returns a token if identifier and hashed password have been validated. Requires both identifier and password in request body
- `/register` ➔ Inserts a record in the database and returns a token. Requires all compulsory fields (See user model below) in the request body

## User Model

```
firstName: {
    type: String,
    required: [true, "firstName is required"]
  },
  lastName: {
    type: String,
    required: [true, "lastName is required"]
  },
  username: {
    type: String,
    unique: [true, "username must be unique"],
    required: [true, "username is required"]
  },
  email: {
    type: String,
    unique: [true, "email must be unique"],
    required: [true, "email is required"]
  },
  password: {
    type: String,
    required: [true, "password is required"]
  },
  chats: {
    recipient: [String]
  },
  token: String
}
```
