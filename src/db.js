require("dotenv").config({path:'variables.env'});

const { Pool, Client } = require("pg");

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const pool = new Pool({
    connectionString

  });

  pool.connect((error)=>{
    if(error) throw error;
    console.log(`Conectado no BD:${process.env.DB_NAME}`)
});

module.exports = {pool};