# Signus Server

This is a simple backend server and forms part of the Signus chatting application built on top of Node.

Signus has been created for educational purposes and is part of the **Distributed Systems** module coursework.

## Configured Routes

- `/user` ➔ Information about authenticated user and requires a token in the header
  - `/user/search` ➔ Searches for specific user in the database, requires a token in the header and a `query` parameter
  - `/user/chats` ➔ Lists the chats of the authenticated user and requires a token in the header
- `/login` ➔ Returns a token if identifier and hashed password have been validated
- `/register` ➔ Inserts a record in the database and returns a token
