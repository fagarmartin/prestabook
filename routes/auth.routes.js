const express = require("express");
const router = express.Router();
const User = require("../models/User.model.js");
const bcrypt = require("bcryptjs");
const { emit } = require("nodemon");
const { checkLogin } = require("../middlewares/auth.middlewares.js");
// GET "/auth/signup"=> renderiza el formulario de registro
router.get("/signup",checkLogin, (req, res, next) => {
  res.render("auth/signup");
});

// POST "/auth/signup"=> recoge los datos del formulario de registro
router.post("/signup", async (req, res, next) => {
  const { username, email, password } = req.body;
if (email === "" || password === "" || username === "") {
      res.render("auth/signup.hbs", {
        errorMessage: "Todos los campos son obligatorios"
      });
      return;
    }
    const regexPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    if(regexPattern.test(password)=== false){
        res.render("auth/signup",{
            errorMessage: "La contraseña es debil.Necesita al menos una mayúscula, una minúscula, un caracter especial y mínimo 8 caracteres"
        });
        return

    }
  try {
    const foundUser = await User.findOne({email})
    if(foundUser !== null){
        res.render("auth/signup", {
            errorMessage: "Ya existe un usuario con ese correo electronico",
        })
        return
    }
    const salt = await bcrypt.genSalt(12)
    const hashPassword = await bcrypt.hash(password, salt)
    await User.create({
        username,
        email,
        password: hashPassword
    })
    res.redirect("/auth/login")
    
  } catch (error) {
    next(error);
  }
});

//GET "/auth/login" => renderiza un formulario de acceso a la web
router.get("/login", checkLogin,(req, res, next) => {
  res.render("auth/login.hbs");
});

//POST "/auth/login" => recoge datos del formulario de login
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (email === "" || password === "") {
    res.render("auth/login.hbs", {
      errorMessage: "Los campos email y contraseña son obligatorios",
    });
    return;
  }
  try {
    const foundUser = await User.findOne({ email });
    if (foundUser === null) {
      res.render("auth/login", {
        errorMessage: "Email incorrecto",
      });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password
    );
    if (isPasswordCorrect === false) {
      res.render("auth/login", {
        errorMessage: "Contraseña incorrecta",
      });
      return;
    }
    req.session.user = foundUser;
    req.session.save(() => {
      
      //segun su rol le redirecciona a una pagina diferente
      if(foundUser.role==="admin")
      {
        res.redirect("/admin/index-admin");
      }
      else{
        res.redirect("/");
      }
     
    });
  } catch (error) {
    next(error);
  }
});

// GET "/auth/logout" cierra sesion activa y redirecciona a login
router.get("/logout",(req,res,out)=>{
  req.session.destroy(()=>{
    res.redirect("/auth/login")
  })
})

module.exports = router;
