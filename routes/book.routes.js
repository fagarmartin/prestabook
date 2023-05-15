const express = require("express");
const router = express.Router();

const Book = require("../models/Book.model.js");

// GET "/book/:id"=> renderiza los detalles del libro

router.get("/:id", async(req, res, next)=>{
    try{
         const bookDetails = await Book.findById(req.params.id)
        res.render("book/index", {
            bookDetails
        })
    }
catch(error){
    next(error)
}
   
})

// GET "/book/search-list" => renderiza la vista de buscar libro

router.get("/search-list", async(req, res, next)=>{
    try{
        const searchBook = await Book.findOne({title: req.query.title},{author})

    }
    catch(error){
        next(error)
    }
})


module.exports = router;