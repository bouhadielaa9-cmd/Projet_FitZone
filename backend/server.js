const express = require('express');
const cors = require('cors');
const connexion = require('./connexion');
const app = express();

app.use(cors());
app.use(express.json());
app.get('/api/produits', (req, res) => {

    const sql = 'SELECT * FROM produits';

    connexion.query(sql, (erreur, resultat) => {

        if (erreur) {
            res.status(500).json({ message: 'Erreur serveur' });
        } else {
            res.json(resultat);
        }

    });

});
app.listen(3000, () => {
    console.log('Serveur démarré sur http://localhost:3000');
});