const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User=require("../models/User.model.js")

const {isLoggedIn,isAdmin}=require("../middlewares/auth.middlewares.js")

// GET "/private/profile" => renderiza pagina privada del usuario
router.get("/profile",isLoggedIn,isAdmin,(req,res,next)=>{
    res.render("profile/index-user")
})

module.exports = router;