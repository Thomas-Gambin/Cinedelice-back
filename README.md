# Cinedelices

**Cinedelices** is a group capstone project completed at the end of our training program. Our mission was to create a website where users could browse and create recipes inspired by pop culture (movies, TV series, anime/manga, video games, literature).

---

## Cinedelices Backend

Backend API and Back Office for the Cinedelices project, a platform dedicated to cinema and gastronomy.

Frontend repo link: [https://github.com/Thomas-Gambin/Cinedelice-back](https://github.com/Thomas-Gambin/Cinedelice-back)

---

## Prerequisites

- Node.js (recommended version: >=18.x)  
- PNPM (version 10.7.1 or higher)  
- Docker and Docker Compose (for development and production environments)  
- MariaDB (if running locally without Docker)
- Cloudinary account (if you want to add picture at your recipe)
- Mailersend account (if you want to create account for testing the register/login method)

---

## Installation

### Clone the repository:

```bash
git clone git@github.com:Thomas-Gambin/Cinedelice-back.git
```

### Install dependencies:

```bash
pnpm install
```

### Create a `.env` file at the root of the project based on the following example:

```ini
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=cinedelice
DATABASE_NAME=cinedelice
DATABASE_PORT=3306

CLOUDINARY_NAME=your_cloudinay_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

PORT=3000

JWT_SECRET=your_very_secure_jwt_secret
JWT_REFRESH_SECRET=your_very_secure_refresh_secret

MAIL_APIKEY=your_mailersend_api_key
```

**Note:**
- For `JWT_SECRET` and `JWT_REFRESH_SECRET`, generate secure random strings.
- To get a MailerSend API key, create an account on [MailerSend](https://www.mailersend.com).
- To obtain a Cloudinary API key, create an account on [Cloudinary](https://cloudinary.com).

---

## Project Structure

```
src/
├── @types/          # TypeScript types
├── controllers/     # Request handling logic
├── database/        # Database configuration, Sequelize models and associations
├── middlewares/     # Express middlewares (authentication, etc.)
├── routes/          # API route definitions
├── utils/           # Utility functions
├── validators/      # Validation schemas (Joi)
└── index.ts         # Application entry point
```

---

## Available Commands

- `pnpm dev`: Start the server in development mode with hot-reload  
- `pnpm build`: Compile the TypeScript code  
- `pnpm start`: Start the server in production mode (requires prior compilation)  
- `pnpm seed`: Populate the database with initial data  
- `pnpm format`: Check code formatting with Biome  
- `pnpm format:write`: Automatically format the code with Biome  
- `pnpm lint`: Analyze the code for potential issues

---

## Local Development

### With Docker

Make sure Docker and Docker Compose are installed and running.

Start the database:

```bash
docker compose up -d
```

Wait a few seconds for the database to be fully up, then run:

```bash
pnpm seed
```

This command will seed the database with initial data.

You can then start the project with:

```bash
pnpm dev
```

## API Documentation

This document describes the available endpoints for the Cinedelices backend API.

| Method | Route | Description | Body / Query Params | Auth Required |
|--------|-------|-------------|----------------------|----------------|
| POST   | `/api/auth/login` | User login | `{ "email": "string", "password": "string" }` | ❌ |
| POST   | `/api/auth/register` | Register a new user | `{ "username": "string", "email": "string", "password": "string" }` | ❌ |
| POST   | `/api/auth/confirm` | Confirm verification code | `{ "email": "string", "code": number }` | ❌ |
| GET    | `/api/auth/refresh` | Generate new access token from refresh token | - | ❌ |
| GET    | `/api/auth/private` | Protected private route (JWT) | - | ✅ |
| GET    | `/api/categories` | Retrieve all categories | - | ❌ |
| GET    | `/api/medias` | Retrieve all medias with filters | - | ❌ |
| GET    | `/api/medias/:id` | Retrieve a media by ID | - | ❌ |
| GET    | `/api/medias/:id/recipes` | Retrieve recipes linked to a media | - | ❌ |
| GET    | `/api/recipes` | List recipes with filters (title, ingredients...) | - | ❌ |
| GET    | `/api/recipes/:id` | Retrieve a recipe by ID | - | ❌ |
| POST   | `/api/recipes` | Create a recipe | `{ "name": "string", "description": "string", "mediaId": number, "categoryId": number, "steps": [...], "compositions": [...] }` | ✅ |
| PUT    | `/api/recipes/:recipeId/coverImg` | Update cover image of a recipe | FormData: `coverImg` (file) | ✅ |
| GET    | `/api/me` | Get info of the authenticated user | - | ✅ |

**Legend:**
- ✅ = Authentication required (JWT)
- ❌ = No authentication required

# Backoffice Routes Documentation

## Base URL

The main page of the backoffice is `/backoffice/dashboard`

All routes are prefixed with: `/backoffice`

---

## 👨‍🍳 Recipe Management

| Method | Route                 | Description                 | Body / Params |
|--------|-----------------------|-----------------------------|----------------|
| GET    | `/recipes`            | Display all recipes in the backoffice | - |
| POST   | `/recipes/create`     | Create a new recipe         | - |
| POST   | `/recipes/:id/edit`   | Edit an existing recipe     | Param: `id` = recipe ID, Body: same as create |
| DELETE | `/recipes/:id`        | Delete a recipe             | Param: `id` = recipe ID |

---

## 🥦 Ingredient Management

| Method | Route                     | Description         | Body / Params |
|--------|---------------------------|---------------------|----------------|
| GET    | `/ingredients`            | List all ingredients | - |
| POST   | `/ingredients/create`     | Create an ingredient | - |
| POST   | `/ingredients/:id/edit`   | Edit an ingredient   | Param: `id` = ingredient ID |
| DELETE | `/ingredients/:id`        | Delete an ingredient | Param: `id` = ingredient ID |

---

## 📁 Media Management

| Method | Route                  | Description        | Body / Params |
|--------|------------------------|--------------------|----------------|
| GET    | `/medias`              | List all medias    | - |
| POST   | `/medias/create`       | Add a media        | - |
| POST   | `/medias/:id/edit`     | Edit a media       | Param: `id` = media ID |
| DELETE | `/medias/:id`          | Delete a media     | Param: `id` = media ID |

---

## 👤 User Management

| Method | Route            | Description          | Body / Params |
|--------|------------------|----------------------|----------------|
| GET    | `/users`         | Display all users    | - |

