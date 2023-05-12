const { Schema, model, default: mongoose } = require("mongoose");

const prestamoSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
  },
  status: {
    type: String,
    enum: ["Prestado", "Retornado"],
  },
});
const Prestamo = model("Prestamo", prestamoSchema);

module.exports = Prestamo;