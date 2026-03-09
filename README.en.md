<div align="center">

<img src="https://aquarium.org.ru/img/logo/logo-rounded.svg" alt="Aquarium" width="120" />

# Aquarium

**A modern open source messenger built with React + Node.js**

English | [Русский](README.md)

[![Beta](https://img.shields.io/badge/status-beta-orange?style=flat-square)](https://github.com/aquarium-mini-source-code)
[![License: GPL-3.0](https://img.shields.io/badge/license-GPL--3.0-blue?style=flat-square)](./LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=flat-square&logo=node.js)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](./CONTRIBUTING.md)
[![Stars](https://img.shields.io/github/stars/aquarium-mini-source-code?style=flat-square)](https://github.com/aquarium-mini-source-code/stargazers)
[![Issues](https://img.shields.io/github/issues/aquarium-mini-source-code?style=flat-square)](https://github.com/aquarium-mini-source-code/issues)

[🌐 Live Demo](https://aquarium.org.ru) · [🐛 Report a Bug](https://github.com/aquarium-mini-source-code/issues) · [💡 Request a Feature](https://github.com/aquarium-mini-source-code/issues)

---

<div align="center">
  <video src="https://aquarium.org.ru/img/pr/video-1.mp4" muted autoplay>
</div>

</div>

---

<a id="english"></a>

## 📖 About

**Aquarium** is a full-stack open source web messenger built with React and Node.js. It supports real-time messaging, media sharing, reactions, and notifications.

The project was created for those who value staying in touch with loved ones and staying up-to-date with current information. The messenger supports real-time messaging, video calling, and recording sharing.

### Screenshots

<div align="center">
  <img src="https://aquarium.org.ru/img/pr/photo-1.jpg" alt="Main page" width="49%" />
  <img src="https://aquarium.org.ru/img/pr/photo-2.jpg" alt="Chat with user" width="49%" />
  <img src="https://aquarium.org.ru/img/pr/photo-3.jpg" alt="Interface of call" width="49%" />
  <img src="https://aquarium.org.ru/img/pr/photo-4.jpg" alt="Create a post" width="49%" />
</div>

---

## ✨ Features
****
| Feature                    | Description                                                 |
| -------------------------- | ----------------------------------------------------------- |
| 💬 **Direct Messages**      | Private chats between users                                 |
| 📞 **Calls**                | Video calls via WebRTC protocol using our own coturn server |
| 📎 **File & Media Sharing** | Images and videos in posts                                  |
| 😄 **Emoji**                | To express your mood (in notes and messages)                |
| 🔔 **Notifications**        | Push notifications for new messages                         |
| 🔐 **JWT Authentication**   | Secure login with Access and Refresh tokens                 |
| 📲 **Yandex OAuth**         | Quick sign-in via Yandex OAuth                              |
| ⚡ **Real-time**            | Instant data delivery via WebSocket                         |

---

## 🛠 Tech Stack

| Layer              | Technologies                            |
| ------------------ | --------------------------------------- |
| **Frontend**       | React 18, Joy UI, React Router v6       |
| **Backend**        | Node.js 18, Express.js 4, Sequelize ORM |
| **Database**       | MySQL 8.0                               |
| **Authentication** | JWT (access + refresh tokens)           |
| **Real-time**      | WebSocket                               |

---

## 🚀 Quick Start

### Requirements

- Node.js 22+
- npm 9+
- MySQL 8.0
- Docker (optional)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/aquarium-mini-source-code.git
cd aquarium-mini-source-code

# 2. Install dependencies (root + client + server)
npm install

# 3. Configure environment
cp server/.env.example server/.env
# Fill in the variables in server/.env (see section below)

# 4. Start the application (frontend + backend)
npm start
# Client -> http://localhost:3000
# Server -> http://localhost:8000
```

---

## ⚙️ Configuration

### Environment Variables (`.env`)

The `.env` file lives in the `server/` directory.

```env
# Server
PORT=8000
APP_ENV="localhost"
APP_DOMAIN="http://localhost:3000"

DB_HOST="localhost"
DB_USER="root"
DB_PASSWORD=""
DB_NAME=""

ACCESS_SECRET=""
REFRESH_SECRET=""
ENCRYPTION_KEY=""

LIFETIME_ACCESS_TOKEN_MIN=15
LIFETIME_REFRESH_TOKEN_DAYS=7

EMAIL_USER=no-reply@aquarium.org.ru
EMAIL_PASS=
EMAIL_HOST=mail.aquarium.org.ru
EMAIL_PORT=465
EMAIL_SECURE=true

TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=

YANDEX_CLIENT_ID=
YANDEX_CLIENT_SECRET=
```

---

## 📁 Project Structure

```
aquarium-mini-source-code/
├── client/                 # React application
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── config/         # Project configuration
│       ├── css/            # CSS styles
│       ├── data/           # Static data
│       ├── hooks/          # Custom React hooks
│       ├── middlewares/    # Client-side logic
│       ├── pages/          # Application pages
│       ├── routes/         # Route configuration
│       └── utils/          # Utility functions
│
├── server/                 # Node.js + Express API
│   └── src/
│       ├── controllers/    # Route controllers
│       ├── services/       # Business logic
│       ├── models/         # Sequelize models
│       ├── middlewares/    # Server middlewares
│       ├── tests/          # Unit and E2E tests
│       ├── routes/         # API routes
│       └── config/         # Server configuration
│
└── package.json            # Root scripts (init, start, build)
```

---

## 🌐 API

**Base URL**: `https://api.aquarium.org.ru/api`
**Base URL (local)**: `http://localhost:8000/api`

### Authentication

| Method | Endpoint         | Description                             |
| ------ | ---------------- | --------------------------------------- |
| `POST` | `/auth/email`    | Send a login/registration code to email |
| `POST` | `/auth/code`     | Confirm e‑mail code                     |
| `POST` | `/auth/password` | Sign in with password                   |
| `POST` | `/auth/register` | Register a new user                     |
| `GET`  | `/auth/yandex`   | Start Yandex OAuth flow                 |
| `POST` | `/auth/check`    | Check session and refresh token         |
| `POST` | `/auth/csrf`     | Obtain CSRF token                       |
| `POST` | `/auth/logout`   | Sign out                                |

### Users & Profile

| Method   | Endpoint                       | Description                  |
| -------- | ------------------------------ | ---------------------------- |
| `GET`    | `/users`                       | List users                   |
| `GET`    | `/users/:userId/subs`          | Get user subscribers         |
| `GET`    | `/users/:userId/sub`           | Get user subscriptions       |
| `GET`    | `/profile`                     | Get current user profile     |
| `PATCH`  | `/profile`                     | Update profile               |
| `DELETE` | `/profile`                     | Delete account               |
| `GET`    | `/profile/avatars`             | Available avatars            |
| `PATCH`  | `/profile/avatar`              | Select avatar                |
| `PATCH`  | `/profile/avatar/upload`       | Upload avatar                |
| `GET`    | `/profile/caps`                | Available profile covers     |
| `PATCH`  | `/profile/cap`                 | Select profile cover         |
| `PATCH`  | `/profile/cap/upload`          | Upload profile cover         |
| `POST`   | `/profile/question`            | Send a support question      |
| `GET`    | `/profile/hasPassword`         | Check if user has a password |
| `POST`   | `/profile/password`            | Change password              |
| `GET`    | `/profile/notifications`       | List notifications           |
| `GET`    | `/profile/notifications/count` | Count unread notifications   |
| `DELETE` | `/profile/notifications`       | Clear notifications          |

### Tokens & Follows

| Method   | Endpoint           | Description               |
| -------- | ------------------ | ------------------------- |
| `GET`    | `/user/token`      | Get current refresh token |
| `GET`    | `/user/tokens`     | List active sessions      |
| `DELETE` | `/user/tokens`     | Revoke other sessions     |
| `GET`    | `/user/follow/:id` | Check if user is followed |
| `POST`   | `/user/follow/:id` | Follow a user             |
| `DELETE` | `/user/follow/:id` | Unfollow a user           |

### Posts, Bookmarks & Comments

| Method   | Endpoint             | Description                 |
| -------- | -------------------- | --------------------------- |
| `GET`    | `/post`              | Get a single post           |
| `GET`    | `/posts`             | Feed of posts               |
| `POST`   | `/post`              | Create a post               |
| `PUT`    | `/post`              | Update a post               |
| `DELETE` | `/post`              | Delete a post               |
| `POST`   | `/post/upload`       | Upload files for a post     |
| `POST`   | `/post/like`         | Like/unlike a post          |
| `GET`    | `/post/bookmark/:id` | Check if post is bookmarked |
| `POST`   | `/post/bookmark/:id` | Add post to bookmarks       |
| `DELETE` | `/post/bookmark/:id` | Remove post from bookmarks  |
| `GET`    | `/post/comments`     | Get post comments           |
| `POST`   | `/post/comments`     | Add a comment               |
| `PUT`    | `/post/comments`     | Update a comment            |
| `DELETE` | `/post/comments`     | Delete a comment            |

### Messages

| Method   | Endpoint                 | Description                     |
| -------- | ------------------------ | ------------------------------- |
| `GET`    | `/chats`                 | List user chats                 |
| `GET`    | `/messages/:userId`      | Get message history with a user |
| `POST`   | `/messages/:userId/send` | Send a message to a user        |
| `DELETE` | `/messages/:userId`      | Delete conversation history     |

> Most endpoints (except some public ones such as `/auth/*`) require the `Authorization: Bearer <token>` header and a refresh-token cookie.

---

## 🗺 Roadmap

- [x] JWT authentication
- [x] Real-time direct messages (WebSocket)
- [x] File and media sharing
- [x] Push notifications
- [x] Mobile responsiveness
- [ ] Message reactions
- [ ] Group chats
- [ ] User status (online / offline)
- [ ] End-to-end encryption
- [ ] Public channels

---

## 📋 Changelog

### v3.0.0 — calls (current version)
- Calls between users

### v2.0.0 — messages and chats
- Added messages
- Implemented notifications
- CI/CD via script

### v1.0.0 — initial release
- Basic authentication (JWT)
- File and media sharing

---

## ❓ FAQ

**Q: Do I need paid hosting to run this?**
A: No. A local machine is sufficient for development. For production, any VPS with Node.js and MySQL will work.

**Q: Can I use a different database?**
A: Sequelize supports PostgreSQL and SQLite. Just change the dialect in the config and you're good to go.

**Q: Is mobile browser supported?**
A: Yes, at future we will create a mobile app for iOS and Android.

**Q: Is storing JWT in localStorage safe?**
A: The project uses httpOnly cookies for the refresh token. The access token is stored in memory.

---

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before submitting a PR.

```bash
# Quick start for contributors
git checkout -b feature/my-feature
# ... make your changes ...
git commit -m "feat: description of change"
git push origin feature/my-feature
# Open a Pull Request
```

---

## Code of Conduct

Rules for using the Aquarium messenger. Read [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).

---

## 📜 License

GPL-3.0 — free to use and modify. Derivative projects must remain open source under the same license. See [LICENSE](./LICENSE) for details.

---

## 👤 Author

**Daniil Dybka**

- [Аквариум](https://aquarium.org.ru/show/dybka)
- [Телеграм](https://ddybka.t.me)
- daniil@dybka.ru

---

<div align="center">
  <sub>Made with ❤️ · Daniil Dybka</sub>
</div>

---
