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
      "romantica",
      "terror",
      "novela negra",
      "narrativa",
      "historica",
      "poesia",
      "ficcion",
    ],
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  // quantity: Number,
  image: {
    type: String,
    required: true,
  },
});

const Book = model("Book", bookSchema);

module.exports = Book;
