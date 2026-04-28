<div align="center">

<img src="https://aquarium.org.ru/img/logo/logo-rounded.svg" alt="Aquarium" width="120" />

# Aquarium

**Modern open source messenger on React+ Node.js**

English | [Русский](README.md )

[🌐 Live demo](https://aquarium.org.ru) 

---

![demo](https://aquarium.org.ru/img/pr/video-2.gif)

</div>

---

## 📖 About the project

**Aquarium** is an open source full—stack web messenger. Implemented on React and Node.JS, supports real-time messaging, media sending, reactions, and notifications.

The project was created for those who need to keep in touch with their loved ones and find out relevant information. The messenger supports real-time messaging, video call functionality, and recording publishing.

### Screenshots

<div align="center">
  <img src="https://aquarium.org.ru/img/pr/photo-1.jpg" alt="Home page" width="49%" />
  <img src="https://aquarium.org.ru/img/pr/photo-2.jpg " alt="Chat with user" width="49%" />
  <img src="https://aquarium.org.ru/img/pr/photo-3.jpg " alt="Bell interface" width="49%" />
  <img src="https://aquarium.org.ru/img/pr/photo-4.jpg " alt="Record creation" width="49%" />
</div>

---

## ✨ Opportunities

| Opportunity | Description |
| ----------------------------- | ------------------------------------------------------------------ |
| 💬 **Private messages** | Private communication between users |
| 📞 **Calls** | Video calls using the WebRTC protocol from Spanish. own coturn server |
| 📎 **Sending files and media** | Images and videos in recordings |
| 😄 **Emoji**                  | To express your mood (in notes and messages)            |
| 🔔 **Notifications** | Push notifications about new messages |
| 🔐 **JWT authentication** | Secure login with Access and Refresh tokens |
| 📲 **Yandex authorization** | Quick login using Yandex OAuth |
| ⚡ **Real-time**               | Instant data delivery via WebSocket |

---

## 🛠 Technology stack

| Layer | Technologies |
| ------------------ | --------------------------------------- |
| **Frontend**       | React 18, Joy UI, React Router v6       |
| **Backend**        | Node.js 18, Express.js 4, Sequelize ORM |
| **Database**    | MySQL 8.0                               |
| **Authentication** | JWT (Access + Refresh tokens)           |
| **Real-time**      | WebSocket                               |

---

## 🚀 Quick Start

### Requirements

- Node.js 22+
- npm 9+
- MySQL 8.0
- Docker (optional)

### Installation

``bash
#1. Clone the repository
git clone https://github.com/DanyaBooba/aquarium-web-client.git
cd aquarium-web-client

# 2. Go to the
cd client folder

#3.
Install npm install dependencies

#4. Launch the app (http://localhost:3000)
npm start
``

---

## 📁 Project structure

``
aquarium-mini-source-code/
├── client/ # React-application
│   └── src/
│       ├── components/     # Reused UI components
,── config/ # Project configuration
│       ├── css/            # CSS styles
│       ├── data/           # Static data
│       ├── hooks/          # Custom React Hooks
│       ├── middlewares/    # Client logic
│       ├── pages/          # Application Pages
│       ├── routes/         # Route configuration
│       ├── hooks/          # Custom React Hooks
│       └── utils/          # Auxiliary functions
│
``

---

## 🌐 API

**Base URL**: `https://api.aquarium.org.ru/api `

### Authentication

| Method | Endpoint | Description |
| ------ | ---------------- | ------------------------------------- |
| `POST` | `/auth/email`    | Sending the code by e‑mail |
| `POST` | `/auth/code` | Code confirmation |
| `POST` | `/auth/password` | Login with a password |
| `POST` | `/auth/register` | Registration of a new user |
| `GET`  | `/auth/yandex`   | Start of authorization via Yandex OAuth |
| `POST` | `/auth/check`    | Session verification and token update |
| `POST` | `/auth/csrf` | Getting a CSRF token |
| `POST` | `/auth/logout`   | Log out |

### Users and profile

| Method | Endpoint | Description |
| -------- | ------------------------------ | ------------------------------------ |
| `GET`    | `/users`                       | List of users |
| `GET`    | `/users/:userId/subs`          | List of the user's subscribers |
| `GET`    | `/users/:userId/sub`           | List of user subscriptions |
| `GET`    | `/profile`                     | Current user's profile |
| `PATCH`  | `/profile`                     | Profile update |
| `DELETE` | `/profile`                     | Account deletion |
| `GET`    | `/profile/avatars`             | Available avatars |
| `PATCH`  | `/profile/avatar`              | Choosing an avatar |
| `PATCH`  | `/profile/avatar/upload`       | Avatar upload |
| `GET`    | `/profile/caps`                | Available profile caps |
| `PATCH`  | `/profile/cap`                 | Cap selection |
| `PATCH`  | `/profile/cap/upload`          | Loading the header |
| `POST`   | `/profile/question`            | Sending a question to support |
| `GET`    | `/profile/hasPassword`         | Checking for a password |
| `POST` | `/profile/password`              | Password change |
| `GET`    | `/profile/notifications`       | List of notifications |
| `GET`    | `/profile/notifications/count` | Number of unread notifications |
| `DELETE` | `/profile/notifications`       | Clearing notifications |

### Tokens and subscriptions

| Method | Endpoint | Description |
| -------- | ------------------ | --------------------------------- |
| `GET`    | `/user/token`      | Current refresh token |
| `GET`    | `/user/tokens`     | List of active sessions |
| `DELETE` | `/user/tokens`     | Completion of other sessions |
| `GET`    | `/user/follow/:id` | Checking a user's subscription |
| `POST`   | `/user/follow/:id` | Subscribe |
| `DELETE` | `/user/follow/:id` | Unsubscribe |

### Posts, bookmarks, and comments

| Method | Endpoint | Description |
| -------- | -------------------- | -------------------------------- |
| `GET`    | `/post` | Get one record |
| `GET`    | `/posts`             | Record feed |
| `POST`   | `/post` | Create a record |
| `PUT`    | `/post` | Update record |
| `DELETE` | `/post` | Delete entry |
| `POST`   | `/post/upload`       | Uploading files for recording |
| `POST`   | `/post/like`         | Like/dislike entries |
| `GET`    | `/post/bookmark/:id` | Check if an entry is in your favorites |
| `POST`   | `/post/bookmark/:id` | Add entry to favorites |
| `DELETE` | `/post/bookmark/:id` | Delete an entry from favorites |
| `GET`    | `/post/comments`     | Get comments on an entry |
| `POST`   | `/post/comments`     | Add a comment |
| `PUT`    | `/post/comments`     | Update comment |
| `DELETE` | `/post/comments`     | Delete a comment |

### Messages

| Method | Endpoint | Description |
| -------- | ------------------------ | --------------------------------- |
| `GET`    | `/chats`                 | User's chat list |
| `GET`    | `/messages/:userId`      | History of correspondence with the user |
| `POST`   | `/messages/:userId/send` | Send a message to the user |
| `DELETE` | `/messages/:userId`      | Delete the history of correspondence |

> All endpoints (except `/auth/*`) require the header `Authorization: Bearer <token>`.

> The endpoints are valid for April 20, 2026.

---

## 🗺 Road map

- [x] JWT authentication
- [x] Real-time Private Messages (WebSocket)
- [x] Sending files and media
- [x] Push Notifications
- [x] Mobile adaptation
- [x] Group Chats
- [x] User statuses (online/offline)
- [ ] Reactions to messages
- [ ] End-to-end encryption
- [ ] Notification Settings

---

## 📋 Project versions

### v4.0.0 - Group chats (current)
- Group chats
- edit, delete messages
- reply to the message and forwarding
- sending photos, videos and files in chats

### v3.0.0 - Calls
- Calls between users

### v2.0.0 — Messages and chats
- Messages
- Notifications
- CI/CD via script

### v1.0.0 — first release
- Basic Authentication (JWT)
- Sending files and media

---

## ❓ FAQ

**Q: Do I need paid hosting to run?**
A: No. A local machine is sufficient for development. Any VPS with Node is suitable for production.js and MySQL.

**Q: Is it possible to use another database?**
A: Sequelize supports PostgreSQL and SQLite. Change the dialect in the config and you're done.

**Q: Is the mobile browser supported?**
A: Yes, there will be a mobile app for iOS and Android in the future.

**Q: Is it safe to store JWT in localStorage?**
A: The project uses HttpOnly cookies for the Refresh token. The access token is stored in memory.

---

## , Contributing

Contribution is welcome! Read it [CONTRIBUTING.md](./CONTRIBUTING.md) before sending the PR.

```bash
# Quick start for contributors
git checkout -b feature/my-feature
# ... making changes ...
git commit -m "feat: description of the change"
git push origin feature/my-feature
# Open the Pull Request
``

---

## Code of Conduct

Rules for using the Aquarium messenger. Read it [CODE_OF_CONDUCT.md ](./CODE_OF_CONDUCT.md ).

---

## 📜 License

GPL-3.0 — free use and modification. Derivative projects are required to remain open with the same license. For more information, see [LICENSE](./LICENSE).

---

## , Author

**Daniel Dybka**

- [Aquarium](https://aquarium.org.ru/show/dybka )
- daniil@dybka.ru

---

<div align="center">
  <sub>Made with ❤️ · Daniil Dybka</sub>
</div>

---
