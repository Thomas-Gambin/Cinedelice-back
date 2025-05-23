# Backoffice Routes Documentation - Cinedelice

## Base URL
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
