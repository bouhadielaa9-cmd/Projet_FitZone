const mysql = require('mysql2');

const connexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fitzone'
});

connexion.connect((erreur) => {
    if (erreur) {
        console.log('Erreur de connexion :', erreur.message);
    } else {
        console.log('Connexion à MySQL réussie !');
    }
});

module.exports = connexion;