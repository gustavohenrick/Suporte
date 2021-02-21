
/*
const express = require('express');
const app = express();
const { pool } = require('./db');
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');


const initializePassport = require("./passportConfig");


//initializePassport(passport);



//Routes

app.set('view engine', 'ejs');

//codificação
app.use(express.urlencoded({extended: false}));

app.use(
    session({
    secret:'secret',

    resave: false,

    saveUninitialized: false
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());


app.get("/", (req, res) =>{
        res.render("index");
});

app.get("/users/register", checkAutheticated, (req, res) =>{
        res.render("register");
});

app.get("/users/login", checkAutheticated, (req, res) =>{
    res.render("login");
});

app.get("/users/dashboard", checkNotAutheticated, (req, res) =>{
    res.render("dashboard", { user: req.user.name });
});

app.get("/users/logout", (req, res)=>{
    req.logOut();
    req.flash("success_msg", "você deslogou");
    res.redirect("/users/login");
});

//VALIDAÇÃO DE DADOS de usuarios
app.post('/users/register', async (req, res)=>{
    let{name, email, password, password2, cluster, area} = req.body;

    console.log({
        name,
        email,
        password,
        password2,
        cluster,
        area
    });

    let errors = [];

    if (!name || !email || !password || !password2, !cluster, !area){
        errors.push({message: "preencha todos os campos"});
    }

    if(password.length < 6){
        errors.push({message: "A senha deve ter pelo menos 6 caracteres"});
    }

    if(password != password2){
        errors.push({message: "Senhas precisam ser idênticas"});
    }

    if(errors.length > 0){
        res.render('register', { errors });
    }else{
        //form validation has passed

        let hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

        pool.query(
            `SELECT * FROM users
            WHERE email = $1`, [email], (err, results)=>{
                if (err){
                    throw err;
                }
                console.log(results.rows);

                if(results.rows.length > 0){
                    errors.push({message: "E-mail já está cadastrado"});
                    res.render('/register', { errors });
                }else{
                    pool.query(
                        `INSERT INTO users(name, email, password, cluster, area)
                        VALUES ($1, $2, $3, $4, $5)
                        RETURNING id, password`, [name, email, hashedPassword, cluster, area],
                         (err, results)=>{
                            if (err){
                                throw err
                            }
                            console.log(results.rows);
                            req.flash('sucess_msg',"Agora você está registrado. por favor fazer seu login");
                            res.redirect("users/login");
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


function checkAutheticated(req, res, next){
    if (res.isAuthenticated()) {
        return res.redirect("/users/dashboard");
    }
    next();
}

function checkNotAutheticated(req, res, next){
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/users/login");
}



module.exports = app;

*/




/*
Eu tenho um erro com meu código, com uma função de passaport
E este erro na janela do navegador quando tento fazer o login

*/