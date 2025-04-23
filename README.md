# Fullstack Application

Une application fullstack avec React pour le frontend et Node.js/Express pour le backend, utilisant MySQL comme base de données.

## Fonctionnalités

- CRUD complet (Create, Read, Update, Delete) des éléments
- Interface utilisateur moderne et responsive
- Gestion des erreurs et des états de chargement
- Base de données MySQL

## Prérequis

- Node.js (v14 ou supérieur)
- MySQL
- npm ou yarn

## Installation

1. Cloner le dépôt :
```bash
git clone https://github.com/VOTRE_NOM_UTILISATEUR/fullstack-app.git
cd fullstack-app
```

2. Installer les dépendances du backend :
```bash
cd backend
npm install
```

3. Installer les dépendances du frontend :
```bash
cd ../frontend
npm install
```

4. Configurer la base de données :
- Créer une base de données MySQL nommée `crud_app`
- Configurer les variables d'environnement dans `backend/.env`

## Configuration

1. Backend (.env) :
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=votre_mot_de_passe
DB_NAME=crud_app
NODE_ENV=development
```

## Démarrage

1. Démarrer le backend :
```bash
cd backend
npm start
```

2. Démarrer le frontend :
```bash
cd frontend
npm start
```

3. Accéder à l'application :
- Frontend : http://localhost:3000
- Backend : http://localhost:5000

## Structure du projet

```
fullstack-app/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── app.js
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## Technologies utilisées

- Frontend : React, Axios
- Backend : Node.js, Express, Sequelize
- Base de données : MySQL
- Style : CSS

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request
