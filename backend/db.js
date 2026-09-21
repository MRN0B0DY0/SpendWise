const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "sql.freedb.tech",
    user: "u_5KNlwi",
    password: "BZy8ZxTBCdXI",
    database: "freedb_DKsCAbn7",
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