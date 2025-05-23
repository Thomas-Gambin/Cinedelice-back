# Documentation des routes Backoffice - Cinedelice

## Base URL
Toutes les routes sont préfixées par : `/backoffice`

---

## 🔐 Authentification Admin
### GET `/login`
- Affiche la page de connexion admin.

### POST `/login`
- Authentifie l'admin.
- Body :
```json
{
  "email": "admin@example.com",
  "password": "••••••"
}
```

### GET `/logout`
- Déconnecte l'admin.

---

## 👨‍🍳 Gestion des Recettes

### GET `/recipes`
- Affiche toutes les recettes dans le backoffice.

### POST `/recipes/create`
- Crée une nouvelle recette.
- Body :
```json
{
  "name": "Tarte aux pommes",
  "description": "Une délicieuse tarte maison.",
  "coverImg": "https://image.url",
  "categoryId": 1,
  "compositions": [
    { "ingredientId": 1, "quantity": "200", "unit": "g" }
  ],
  "steps": [
    { "description": "Préchauffer le four à 180°C." }
  ]
}
```

### POST `/recipes/:id/edit`
- Modifie une recette existante.
- Param : `id` = ID de la recette
- Body : même que création

### DELETE `/recipes/:id`
- Supprime une recette
- Param : `id` = ID de la recette

---

## 🥦 Gestion des Ingrédients

### GET `/ingredients`
- Liste tous les ingrédients

### POST `/ingredients/create`
- Crée un ingrédient
- Body :
```json
{
  "name": "Farine"
}
```

### POST `/ingredients/:id/edit`
- Modifie un ingrédient
- Param : `id` = ID de l'ingrédient

### DELETE `/ingredients/:id`
- Supprime un ingrédient

---

## 📁 Gestion des Médias

### GET `/medias`
- Liste des médias

### POST `/medias/create`
- Ajout d’un média
- Body :
```json
{
  "name": "Image de tarte",
  "url": "https://image.url"
}
```

### POST `/medias/:id/edit`
- Modifie un média

### DELETE `/medias/:id`
- Supprime un média

---

## 👤 Gestion des Utilisateurs

### GET `/users`
- Affiche les utilisateurs

### DELETE `/users/:id`
- Supprime un utilisateur