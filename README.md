# 🛰️ Dronem

**Dronem** est une application web innovante permettant la **génération et la gestion de drones virtuels**.  
Le projet repose sur une architecture moderne **React + ExpressJS + SQLite**, combinant rapidité de développement, simplicité et extensibilité.

---

## 🚀 Objectif du projet

Le but de **Dronem** est de concevoir une plateforme complète qui permet de :
- **Gérer les drones** : modèles, caractéristiques, et images.
- Offrir une interface **claire** et **fluide** pour l’utilisateur.

---

## 🧩 Architecture

### 💻 Frontend — *React*
Le front-end est développé avec **React**, offrant une interface moderne et réactive.

- Gestion des vues principales (accueil, liste des drones, détails, etc.)
- Intégration complète avec les routes de l’API Express
- Gestion des états avec React Hooks
- Personnalisation visuelle avec **CSS** ou **TailwindCSS**

### 🔙 Backend — *ExpressJS*
Le backend repose sur **ExpressJS**, un framework Node.js simple et performant.

- API REST pour la communication entre le front et la base de données
- Gestion des entités (drones, utilisateurs, images)
- Middleware de sécurité et de validation
- Connexion à SQLite via `better-sqlite3` ou `sequelize` (ORM léger)

### 🗄️ Base de données — *SQLite*
- Base locale simple et portable
- Tables : `drones`, `users`, `images`
- 
---

## ⚙️ Installation et lancement

```bash
# 1. Cloner le dépôt
cd dronem

# 2. Installation des dépendances backend
cd back
npm install

# 3. Installation des dépendances frontend
cd ../front
npm install

# 4. Lancer le backend (port 8080 par défaut)
cd ../back
npm run start

# 5. Lancer le frontend (port 5173 par défaut)
cd ../front
npm start
