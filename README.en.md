# Aquarium Mini messenger web client

![React](https://img.shields.io/badge/react-18-blue)
![License](https://img.shields.io/badge/license-GPL--3.0-green)
![Status](https://img.shields.io/badge/status-active-success)
![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen)

English | [Русский](README.md)

## Quick start

1. Clone a repository:

```bash
git clone https://github.com/DanyaBooba/aquarium-mini-web-client.git
```

2. Go to the client's directory:

```bash
cd aquarium-mini-web-client/client
```

3. Install Dependencies:

```bash
npm install
```

4. Launch the app:

```bash
npm start
```

After launch, the client will be available at:

```
http://localhost:3000
```

## Description

**Aquarium Mini** is an open source web client for the messenger of the same name. The client is implemented in React and is designed for customizing the user interface, experimenting with UX, and developing your own alternative clients that are compatible with the project's API.

The client uses the public API of the Aquarium mini messenger, available at: `https://mini.aquarium.org.ru/api`

## Screenshots

The `assets` folder contains screenshots of the application interface. It is recommended to have screenshots for a quick visual overview of the project.

## Project status

The project is under active development.

Functionality and architecture may change, however the core APIs and client structure are considered stable and usable in your own projects.

---

## Project objectives

* provide a lightweight and extensible web client for the Aquarium Mini messenger
* serve as a foundation for custom clients and UI experiments
* simplify the development of alternative interfaces without the need to write a backend

---

## Technology stack

* **React 18** — the basis of the application
* **Joy UI** — a library of UI components
* **React Router** — routing
* **JavaScript (ES6+)** — the main language

---

## Project structure

Brief description of key directories:

```
src/
├─ components/     # Reusable UI components
├─ pages/          # Application pages
├─ routes/         # Routing configuration
├─ hooks/          # Custom React hooks
├─ utils/          # Helper functions and API wrappers
├─ config/         # Client and API configuration
├─ middlewares/    # Client data processing logic
├─ data/           # Static data
├─ ...

public/
├─ img/            # Images, icons, avatars
├─ favicon.ico
├─ ...
```

---

## Project requirements and assembly

### Requirements

* Node.js 18+
* npm

### Project assembly (production)

The standard React script is used to create a production build.

```bash
npm run build
```

After executing the command:

- the `dist/` folder will be created
- it contains an optimized production version of the client
- the build is ready for deployment to any static hosting service (Nginx, Vercel, Netlify, etc.)

---

## Creating your own interface

The project is open for customization and interface expansion.

Recommended work scenario:

1. Make a **fork** of the repository
2. Clone your fork locally
3. Modify UI components in `src/components`
4. Modify pages in `src/pages`
5. Update styles in `src/css`
6. Configure the API and client behavior in `src/config`

No backend is required for layout and UI logic. All changes can be developed and tested locally.

---

## Working with the API

* All HTTP requests are encapsulated in `src/utils`
* The endpoint and connection parameters are configured in `src/config`
* The client allows you to connect any compatible backend

This allows you to use the project as a basis for your own server or test API.

---

## Contributing

Contributions to the project are welcome.

Standard workflow:

1. Fork the repository
2. Create a feature branch
3. Make changes
4. Pull Request to the main branch

---

## License

**GPL‑3.0**

Free copying and modification of the code is allowed. All derivative projects must be distributed with open source code and retain the GPL‑3.0 license.

---

## Author

**Daniil Dybka**
Telegram: [https://ddybka.t.me](https://ddybka.t.me)
Email: [daniil@dybka.ru](mailto:daniil@dybka.ru)
