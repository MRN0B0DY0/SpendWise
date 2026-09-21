const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "sql.freedb.tech",
    user: "u_5KNlwi",
    password: "BZy8ZxTBCdXI",
    database: "freedb_DksCAbn7",
});

db.connect(error => {
    if (error) {
        console.log("DATABASE CONNECTION ERROR:");
        console.log(error);
        return;
    }

    console.log("DATABASE CONNECTED SUCCESSFULLY");

    db.query("SELECT DATABASE() AS database_name", (error, result) => {
        if (error) {
            console.log("DATABASE TEST QUERY FAILED:");
            console.log(error);
            return;
        }

        console.log("CONNECTED DATABASE:");
        console.log(result);
    });
});

module.exports = db;