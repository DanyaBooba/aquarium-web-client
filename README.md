<div align="center">

<img src="https://aquarium.org.ru/img/logo/logo-rounded.svg" alt="Аквариум" width="120" />

# Аквариум

**Современный open source мессенджер на React + Node.js**

[English](README.en.md) | Русский

[![Beta](https://img.shields.io/badge/статус-бета-orange?style=flat-square)](https://github.com/aquarium-mini-source-code)
[![License: GPL-3.0](https://img.shields.io/badge/license-GPL--3.0-blue?style=flat-square)](./LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=flat-square&logo=node.js)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](./CONTRIBUTING.md)
[![Stars](https://img.shields.io/github/stars/aquarium-mini-source-code?style=flat-square)](https://github.com/aquarium-mini-source-code/stargazers)
[![Issues](https://img.shields.io/github/issues/aquarium-mini-source-code?style=flat-square)](https://github.com/aquarium-mini-source-code/issues)

[🌐 Живое демо](https://aquarium.org.ru) · [🐛 Сообщить об ошибке](https://github.com/aquarium-mini-source-code/issues) · [💡 Предложить идею](https://github.com/aquarium-mini-source-code/issues)

---

<div align="center">
  <video src="https://aquarium.org.ru/img/pr/video-1.mp4" muted autoplay>
</div>

</div>

---

## 📖 О проекте

**Аквариум** — full-stack веб-мессенджер с открытым исходным кодом. Реализован на React и Node.js, поддерживает обмен сообщениями в реальном времени, отправку медиа, реакции и уведомления.

Проект создан для тех, кому важно поддерживать связь с близкими и узнавать актуальную информацию. Мессенджер поддерживает real-time отправку сообщений, функциональность звонков с видео и публикацию записей.

### Скриншоты

<div align="center">
  <img src="https://aquarium.org.ru/img/pr/photo-1.jpg" alt="Главная страница" width="49%" />
  <img src="https://aquarium.org.ru/img/pr/photo-2.jpg" alt="Чат с пользователем" width="49%" />
  <img src="https://aquarium.org.ru/img/pr/photo-3.jpg" alt="Интерфейс звонка" width="49%" />
  <img src="https://aquarium.org.ru/img/pr/photo-4.jpg" alt="Создание записи" width="49%" />
</div>

---

## ✨ Возможности

| Возможность                   | Описание                                                           |
| ----------------------------- | ------------------------------------------------------------------ |
| 💬 **Личные сообщения**        | Приватное общение между пользователями                             |
| 📞 **Звонки**                  | Видеозвонки по протоколу WebRTC с исп. собственного coturn сервера |
| 📎 **Отправка файлов и медиа** | Изображения и видео в записях                                      |
| 😄 **Эмодзи**                  | Чтобы выразить свое настроение (в записях и сообщениях)            |
| 🔔 **Уведомления**             | Push-уведомления о новых сообщениях                                |
| 🔐 **JWT-аутентификация**      | Безопасный вход с Access и Refresh токенами                        |
| 📲 **Яндекс авторизация**      | Быстрый вход при помощи OAuth Яндекса                              |
| ⚡ **Real-time**               | Мгновенная доставка данных через WebSocket                         |

---

## 🛠 Технологический стек

| Слой               | Технологии                              |
| ------------------ | --------------------------------------- |
| **Frontend**       | React 18, Joy UI, React Router v6       |
| **Backend**        | Node.js 18, Express.js 4, Sequelize ORM |
| **База данных**    | MySQL 8.0                               |
| **Аутентификация** | JWT (Access + Refresh токены)           |
| **Real-time**      | WebSocket                               |

---

## 🚀 Быстрый старт

### Требования

- Node.js 22+
- npm 9+
- MySQL 8.0
- Docker (опционально)

### Установка

```bash
# 1. Клонировать репозиторий
git clone https://github.com/aquarium-mini-source-code.git
cd aquarium-mini-source-code

# 2. Установить зависимости (root + client + server)
npm install

# 3. Настроить окружение
cp server/.env.example server/.env
# Заполни переменные в server/.env (см. раздел ниже)

# 4. Запустить приложение (frontend + backend)
npm start
# Client -> http://localhost:3000
# Server -> http://localhost:8000
```

---

## ⚙️ Конфигурация

### Переменные окружения (`.env`)

Файл `.env` находится в директории `server/`.

```env
# Сервер
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

## 📁 Структура проекта

```
aquarium-mini-source-code/
├── client/                 # React-приложение
│   └── src/
│       ├── components/     # Переиспользуемые UI-компоненты
│       ├── config/         # Конфигурация проекта
│       ├── css/            # CSS-стили
│       ├── data/           # Статичные данные
│       ├── hooks/          # Кастомные React-хуки
│       ├── middlewares/    # Клиентская логика
│       ├── pages/          # Страницы приложения
│       ├── routes/         # Конфигурация маршрутов
│       ├── hooks/          # Кастомные React-хуки
│       └── utils/          # Вспомогательные функции
│
├── server/                 # Node.js + Express API
│   └── src/
│       ├── controllers/    # Контроллеры маршрутов
│       ├── services/       # Бизнес-логика
│       ├── models/         # Sequelize-модели
│       ├── middlewares/    # Серверные мидлвары
│       ├── tests/          # Unit- и E2E-тесты
│       ├── routes/         # API-маршруты
│       └── config/         # Конфигурация сервера
│
└── package.json            # Root-скрипты (init, start, build)
```

---

## 🌐 API

**Базовый URL**: `https://api.aquarium.org.ru/api`
**Базовый URL (локально)**: `http://localhost:8000/api`

### Аутентификация

| Метод  | Эндпоинт         | Описание                              |
| ------ | ---------------- | ------------------------------------- |
| `POST` | `/auth/email`    | Отправка кода на e‑mail               |
| `POST` | `/auth/code`     | Подтверждение кода                    |
| `POST` | `/auth/password` | Вход по паролю                        |
| `POST` | `/auth/register` | Регистрация нового пользователя       |
| `GET`  | `/auth/yandex`   | Начало авторизации через Яндекс OAuth |
| `POST` | `/auth/check`    | Проверка сессии и обновление токена   |
| `POST` | `/auth/csrf`     | Получение CSRF‑токена                 |
| `POST` | `/auth/logout`   | Выход из системы                      |

### Пользователи и профиль

| Метод    | Эндпоинт                       | Описание                             |
| -------- | ------------------------------ | ------------------------------------ |
| `GET`    | `/users`                       | Список пользователей                 |
| `GET`    | `/users/:userId/subs`          | Список подписчиков пользователя      |
| `GET`    | `/users/:userId/sub`           | Список подписок пользователя         |
| `GET`    | `/profile`                     | Профиль текущего пользователя        |
| `PATCH`  | `/profile`                     | Обновление профиля                   |
| `DELETE` | `/profile`                     | Удаление аккаунта                    |
| `GET`    | `/profile/avatars`             | Доступные аватары                    |
| `PATCH`  | `/profile/avatar`              | Выбор аватара                        |
| `PATCH`  | `/profile/avatar/upload`       | Загрузка аватара                     |
| `GET`    | `/profile/caps`                | Доступные шапки профиля              |
| `PATCH`  | `/profile/cap`                 | Выбор шапки                          |
| `PATCH`  | `/profile/cap/upload`          | Загрузка шапки                       |
| `POST`   | `/profile/question`            | Отправка вопроса в поддержку         |
| `GET`    | `/profile/hasPassword`         | Проверка наличия пароля              |
| `POST`   | `/profile/password`            | Смена пароля                         |
| `GET`    | `/profile/notifications`       | Список уведомлений                   |
| `GET`    | `/profile/notifications/count` | Количество непрочитанных уведомлений |
| `DELETE` | `/profile/notifications`       | Очистка уведомлений                  |

### Токены и подписки

| Метод    | Эндпоинт           | Описание                          |
| -------- | ------------------ | --------------------------------- |
| `GET`    | `/user/token`      | Текущий refresh‑токен             |
| `GET`    | `/user/tokens`     | Список активных сессий            |
| `DELETE` | `/user/tokens`     | Завершение других сессий          |
| `GET`    | `/user/follow/:id` | Проверка подписки на пользователя |
| `POST`   | `/user/follow/:id` | Подписаться                       |
| `DELETE` | `/user/follow/:id` | Отписаться                        |

### Посты, закладки и комментарии

| Метод    | Эндпоинт             | Описание                         |
| -------- | -------------------- | -------------------------------- |
| `GET`    | `/post`              | Получить одну запись             |
| `GET`    | `/posts`             | Лента записей                    |
| `POST`   | `/post`              | Создать запись                   |
| `PUT`    | `/post`              | Обновить запись                  |
| `DELETE` | `/post`              | Удалить запись                   |
| `POST`   | `/post/upload`       | Загрузка файлов для записи       |
| `POST`   | `/post/like`         | Лайк/дизлайк записи              |
| `GET`    | `/post/bookmark/:id` | Проверить, в избранном ли запись |
| `POST`   | `/post/bookmark/:id` | Добавить запись в избранное      |
| `DELETE` | `/post/bookmark/:id` | Удалить запись из избранного     |
| `GET`    | `/post/comments`     | Получить комментарии к записи    |
| `POST`   | `/post/comments`     | Добавить комментарий             |
| `PUT`    | `/post/comments`     | Обновить комментарий             |
| `DELETE` | `/post/comments`     | Удалить комментарий              |

### Сообщения

| Метод    | Эндпоинт                 | Описание                          |
| -------- | ------------------------ | --------------------------------- |
| `GET`    | `/chats`                 | Список чатов пользователя         |
| `GET`    | `/messages/:userId`      | История переписки с пользователем |
| `POST`   | `/messages/:userId/send` | Отправить сообщение пользователю  |
| `DELETE` | `/messages/:userId`      | Удалить историю переписки         |

> Все эндпоинты (кроме `/auth/*`) требуют заголовка `Authorization: Bearer <token>`.

---

## 🗺 Roadmap

- [x] JWT-аутентификация
- [x] Личные сообщения в реальном времени (WebSocket)
- [x] Отправка файлов и медиа
- [x] Push-уведомления
- [x] Мобильная адаптация
- [ ] Реакции на сообщения
- [ ] Групповые чаты
- [ ] Статусы пользователей (онлайн / офлайн)
- [ ] End-to-end шифрование
- [ ] Публичные каналы

---

## 📋 Changelog

### v3.0.0 - звонки (active)
- Звонки между пользователями

### v2.0.0 — сообщения и чаты
- Сообщения
- Уведомления
- CI/CD через скрипт

### v1.0.0 — первый релиз
- Базовая аутентификация (JWT)
- Отправка файлов и медиа

---

## ❓ FAQ

**Q: Нужен ли платный хостинг для запуска?**
A: Нет. Для разработки достаточно локальной машины. Для продакшна подойдёт любой VPS с Node.js и MySQL.

**Q: Можно ли использовать другую базу данных?**
A: Sequelize поддерживает PostgreSQL и SQLite. Смени диалект в конфиге — и все готово.

**Q: Поддерживается ли мобильный браузер?**
A: Да, в будущем будет реализовано мобильное приложение для iOS и Android.

**Q: Безопасно ли хранить JWT в localStorage?**
A: Проект использует httpOnly cookies для Refresh-токена. Access-токен хранится в памяти.

---

## 🤝 Контрибьютинг

Вклад приветствуется! Читай [CONTRIBUTING.md](./CONTRIBUTING.md) перед отправкой PR.

```bash
# Быстрый старт для контрибьюторов
git checkout -b feature/my-feature
# ... вносишь изменения ...
git commit -m "feat: описание изменения"
git push origin feature/my-feature
# Открываешь Pull Request
```

---

##  Кодекс поведения

Правила пользования мессенджером Аквариум. Читай [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).

---

## 📜 Лицензия

GPL-3.0 — свободное использование и модификация. Производные проекты обязаны оставаться открытыми с той же лицензией. Подробнее в [LICENSE](./LICENSE).

---

## 👤 Автор

**Даниил Дыбка**

- [Аквариум](https://aquarium.org.ru/show/dybka)
- [Телеграм](https://ddybka.t.me)
- daniil@dybka.ru

---

<div align="center">
  <sub>Сделано с ❤️ · Даниил Дыбка</sub>
</div>

---
