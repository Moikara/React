import Book from "../models/Book.js"

export const getBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        if (books.length > 0) {
            return res.json(books);
        }

        res.json({ message: "Nothing found" });
    } catch (error) {
        res.json({ message: "Error" })
    }
};

export const getBook = async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findOne({ id: id });

        if (book) {
            return res.json(book);
        }

        res.json({ message: "Nothing found" });
    } catch (error) {
        res.json({ message: "Error" })
    }
};

export const addBook = async (req, res) => {
    try {
        const newBook = req.body;
        await Book.create(newBook);
        res.json(newBook);
    } catch (error) {
        res.json({ message: "Error" })
    }
};

export const updateBook = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.user.userId;

        const BookToBeUpdated = await Book.findOne({ id: id });

        if (BookToBeUpdated.user_id !== userId) {
            return res.sendStatus(401);
        }

        const newBook = req.body;  
        await Book.updateOne({id: id}, newBook);
        
        res.json(newBook);
    } catch (error) {
        res.json({ message: "Error" })
    }
};

export const deleteBook = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.user.userId;

        const BookToBeDeleted = await Book.findOne({ id: id });

        if (BookToBeDeleted.user_id !== userId) {
            return res.sendStatus(401);
        }

        await Book.findOneAndRemove({ id: id });
        res.sendStatus(200);
    } catch (error) {
        res.json({ message: "Error" })
    }
};
