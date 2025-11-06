## Installation
```
npm install
npm run start
```

## Architecture envisagée
```
public/
│__drone01.png
|__drone02.png
|
routes/
│   ├── droneCtrl.js
│   └── userCtrl.js
utils/
|__ ajoutDonnes.js
│
├── app.js
└── apiRouter.js
|__ dronem_database.db

```

## Description

- **app.js**  
  Point d’entrée du projet.  
  - Monte le **routeur `apiRouter`** sur la route `/api/`.  
  - Définit le dossier **`/public`** comme répertoire **statique** (pour les images et fichiers accessibles directement).

- **apiRouter.js**  
  Définit les routes de l’API (ex : `GET /api/getDroneInfos`).  
  - Chaque route appelle une **fonction de contrôle** définie dans les fichiers du dossier `routes/`.

- **routes/**  
  Contient les **contrôleurs** :  
  - `droneCtrl.js` : gère les opérations liées aux drones.  
  - `userCtrl.js` : gère les opérations liées aux utilisateurs.

- **public/**  
  Contient les **ressources statiques** (images, etc.).

- **utils/**
  Contient les fichiers contenant des fonctions utiles à l'application

- **dronem_database.db**  
  Base de données SQLite locale utilisée par les contrôleurs.
