const { Schema, model, default: mongoose } = require("mongoose");

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  synopsis: String,
  numPag: Number,
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    enum: [
      "Romantica",
      "Terror",
      "Novela negra",
      "Narrativa",
      "Historica",
      "Poesia",
      "Ficcion",
    ],
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
    },
  ],
  // quantity: Number,
  image: {
    type: String,
    required: true,
  },
  stock:{
    type:Number,
    default: 1
  } 
});

const Book = model("Book", bookSchema);

module.exports = Book;
