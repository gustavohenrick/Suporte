const express = require('express');
const app = express();
const { pool } = require('./db');
const bcrypt = require('bcrypt');
const flash = require('express-flash');
const session = require('express-session');
require("dotenv").config();
const passport = require('passport');


const PORT = process.env.PORT || 3000;


exports = function(passportConfig, passport) {

    initializePassport(passport); 
    
    }

// Middleware

// Analisa os detalhes de um formulário]

app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

//codificação


app.use(
    session({
        // Chave que queremos manter em segredo, que criptografará todas as nossas informações
        secret: process.env.SESSION_SECRET,
        // Devemos salvar novamente nossas variáveis de sessão se nada mudar que não
    resave: false,
        /// Salve o valor vazio se não houver valor que não queremos fazer
    saveUninitialized: false
    })
);


app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.get("/", (req, res) => {
        res.render("index");
});

app.get("/users/register", checkAuthenticated, (req, res) => {
        res.render("register.ejs");
});

app.get("/users/login", checkAuthenticated, (req, res) =>{
    res.render("login.ejs");
});

app.get("/users/dashboard", checkAuthenticated, (req, res) => {
    console.log(req.isAuthenticated());
    res.render("dashboard", { user: req.user.name });
});

app.get("/users/logout", (req, res) => {
    req.logout();
    res.render("index", { message: "você deslogou" });
  });

//VALIDAÇÃO DE DADOS de usuarios
app.post('/users/register', async (req, res) => {
    let { name, email, password, password2, cluster, area } = req.body;

let errors = [];

    console.log({
        name,
        email,
        password,
        password2,
        cluster,
        area
    });

    if (!name || !email || !password || !password2, !cluster, !area) {
        errors.push({ message: "preencha todos os campos" });
    }

    if(password.length < 6) {
        errors.push({ message: "A senha deve ter pelo menos 6 caracteres"});
    }

    if(password !== password2) {
        errors.push({ message: "Senhas precisam ser idênticas" });
    }

    if(errors.length > 0) {
        res.render("register", { errors, name, email, password, password2, cluster, area });
    } else {
        hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

//form validation has passed  =====================================================================================

        pool.query(
            `SELECT * FROM users
            WHERE email = $1`, [email], (err, results) => {
                if (err) {
                    console.log(err);
                }
                console.log(results.rows);

                if(results.rows.length > 0) {
                    return res.render("register", {
                        message: "E-mail já está cadastrado"});
                } else {
                    pool.query(
                        `INSERT INTO users (name, email, password, cluster, area)
                                VALUES ($1, $2, $3, $4, $5)
                                RETURNING id, password`, 
                        [name, email, hashedPassword, cluster, area],
                         (err, results) => {
                            if (err) {
                                throw err;
                            }
                            console.log(results.rows);
                            req.flash("success_msg", "Agora você está registrado. por favor fazer seu login");
                            res.redirect("/users/login");
                        }
                    );
                }
            }
        );
    }   
});


app.post(
    "/users/login", 
    passport.authenticate("local",{
    successRedirect: "/users/hashboard",
    failureRedirect: "/users/login",
    failureFlash: true
    })
);

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect("/users/dashboard");
    }
    next();
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/users/login");
  }


module.exports = app;

