import express from "express";

import {
    getBooks,
    addBook,
    getBook,
    updateBook,
    deleteBook
} from "../controllers/libraryController.js"

import auth from "../midleware/auth.js";

const router = express.Router();

router.use(auth)

//GET /books                          --> returns a list of all books
//GET /books?author=<author_name>     --> returns a list of books where you search for books based on author name
router.get("/books", getBooks);
//GET /books/:id                      --> returns a book with that id
router.get("/books/:id", getBook);
//POST /books                         --> creates a new book
router.post("/books", addBook);
//PUT /books/:id                      --> modifies an existing book
router.put("/books/:id", updateBook);
//DELETE /books/:id 
router.delete("/books/:id", deleteBook);

export default router;