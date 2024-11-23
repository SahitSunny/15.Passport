const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

authUser = (user, password, done) => {
  console.log(`value of user is authUser function -> ${user}`);
  console.log(`value of password is authUser function -> ${password}`);

  const authenticated_user = { id: 123, name: "sahit" };
  return done(null, authenticated_user);
};

passport.use(new LocalStrategy(authUser));

passport.serializeUser((user, done) => {
    console.log("serialize user")
    console.log(user)
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    console.log("deserialize user")
    console.log(id)
    done(null, {name: "sahit", id: 123})
});


let count = 1
printData = (req, res, next) => {
    console.log(`username -> ${req.body.username}`)
    console.log(`password -> ${req.body.password}`)
    next()
}

app.use(printData)

app.listen(3000, () => {
    console.log("server started at 3000")
})


app.get('/login', (req, res) => {
    res.render("login.ejs")
})

app.post('/login', passport.authenticate('local', {
    successRedirect: "/dashboard",
    failureRedirect: "/login"
}))

app.get('/dashboard', (req, res) => {
    res.render('dashboard.ejs', {name: req.user.name})
})

