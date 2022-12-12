import express from "express";
import mongoose from "mongoose";

import libraryRouter from "./routes/libraryRouter.js"
import userRouter from "./routes/userRouter.js";

await mongoose.connect("mongodb://localhost:27017/libraryDB");

const server = express();
const port = 3000;

server.use(express.json())

server.use("/library", libraryRouter );
server.use("/users", userRouter);

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})