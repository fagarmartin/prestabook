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
      "Histórica",
      "Poesía",
      "Ficción",
    ],
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  quantity: Number,
});

const Book = model("Book", bookSchema);

module.exports = Book;