const express = require('express');
const app = require('./app');
require("dotenv").config({path:'variables.env'});
const db = require('./db');



module.exports = {

};

app.set('port', process.env.PORT);

const server = app.listen(app.get('port'), ()=>{
    console.log(`Servidor rodando em: http://localhost:${process.env.PORT}`);
});