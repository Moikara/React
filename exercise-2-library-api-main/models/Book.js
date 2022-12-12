import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    id: Number,
    user_id: Number,
    title: String,
    author: String,
    read: Boolean
});

const Book = mongoose.model("books", bookSchema);

export default Book;
