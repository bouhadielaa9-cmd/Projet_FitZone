const fs = require('fs');
const path = require('path');
const connexion = require('./connexion');
const fichier = path.join(__dirname, '../database/db.json');const donnees = JSON.parse(fs.readFileSync(fichier, 'utf8'));

const produits = donnees.products;
const sql = `INSERT INTO produits
(id, nom, photo, prix, enStock, dateAjout, categorie, description, commentaires, tailles, couleurs, poids)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
console.log(produits);
produits.forEach((p) => {

    const valeurs = [
        p.id,
        p.nom,
        p.photo,
        p.prix,
        p.enStock,
        p.dateAjout,
        p.categorie,
        p.description,
        JSON.stringify(p.commentaires || []),
        JSON.stringify(p.tailles || []),
        JSON.stringify(p.couleurs || []),
        p.poids || null
    ];

    connexion.query(sql, valeurs, (erreur) => {
        if (erreur) {
            console.log('Erreur :', erreur.message);
        } else {
            console.log('Produit ajouté :', p.nom);
        }
    });

});