const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log('This is a request');
    next();
});

app.use((req, res, next) => {
    res.send("This is a server message");
});

module.exports = app;
