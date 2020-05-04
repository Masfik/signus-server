# Signus Server

This is a simple backend server and forms part of the Signus chatting application and is built on top of Node.

Signus has been created for educational purposes and is part of the **Distributed Systems** module coursework.

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

- `/user` ➔ Information about authenticated user and requires a token in the header
  - `/user/search/:id` ➔ Searches for specific user in the database, requires a token in the header and a `query` parameter
  - `/user/chats` ➔ Lists the chats of the authenticated user and requires a token in the header
- `/login` ➔ Returns a token if identifier and hashed password have been validated
- `/register` ➔ Inserts a record in the database and returns a token
