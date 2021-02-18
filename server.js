require("dotenv").config();

const mysql = require("mysql2");
const express = require("express");

const app = express();

// Создаем подключение с параметрами из .env
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Отправляем запрос к БД и возвращаем ответ в формате JSON
app.get("/users", function (request, response) {
    connection.query("SELECT first_name, last_name FROM users", function (error, data) {
        if (error) throw error;

        response.json({"users": data});
        console.log("Данные отправлены");
    })
});

app.listen(process.env.PORT, function() {
    console.log("Сервер прослушивает порт " + process.env.PORT);
});