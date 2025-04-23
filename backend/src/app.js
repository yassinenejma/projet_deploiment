require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const sequelize = require('./config/database');
const Item = require('./models/Item');

const app = express();
const PORT = process.env.PORT || 5000;

console.log('Starting server...');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route pour la racine
app.get('/', (req, res) => {
    console.log('Root route accessed');
    res.send('Bienvenue sur l\'API CRUD !');
});

// Routes
app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ 
        error: 'Une erreur est survenue sur le serveur',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Database Connection
console.log('Attempting to connect to MySQL...');
sequelize.authenticate()
    .then(() => {
        console.log('Connected to MySQL successfully');
        // Synchronize the database
        return sequelize.sync();
    })
    .then(() => {
        console.log('Database synchronized');
    })
    .catch(err => {
        console.error('Error connecting to MySQL:', err);
        process.exit(1);
    });

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});