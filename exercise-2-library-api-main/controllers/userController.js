import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../models/User.js";

export const register = async (req, res) => {
    const username = req.body.username;
    const password = await bcrypt.hash(req.body.password, 10);

    if (!username || !password) {
        return res.sendStatus(400);
    }

    const users = await User.find({});
    const id = users.length + 1;

    User.create({ id, username, password});
    res.status(200).send();
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.sendStatus(400);
    }

    const query = await User.findOne({ username: username });

    if (!query) {
        return res.sendStatus(401);
    }

    const auth = await bcrypt.compare(password, query.password);

    if (!auth) {
        return res.sendStatus(401);
    }

    dotenv.config();

    res.json({
        token: jsonwebtoken.sign(
            { type: "session", userId: query.id },
            process.env.TOKEN,
            { expiresIn: "1h" })
    })
};