const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "0BA2e65@70fcc",
    database: "spendwise"
});

db.connect(error => {
    if (error) {
        console.log("Database Connection Failed");
        console.log(error);
    } else {
        console.log("Database Connected");
    }
});

module.exports = db;