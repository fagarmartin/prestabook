const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User=require("../models/User.model.js")

const {isLoggedIn,isUser}=require("../middlewares/auth.middlewares.js")

// GET "/private/profile" => renderiza pagina privada del usuario
router.get("/profile",isLoggedIn,isUser,(req,res,next)=>{
    res.render("profile/index-user")
})

module.exports = router;