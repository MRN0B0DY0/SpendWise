/*
const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "sql12.freesqldatabase.com",
    user: "sql12837617",
    password: "HsbhQCw3Jl",
    database: "sql12837617",
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

*/

const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "data.json");

const data = JSON.parse(
    fs.readFileSync(dataPath, "utf-8")
);

console.log("DATA.JSON LOADED SUCCESSFULLY");

module.exports = data;