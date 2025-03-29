import express from "express";
import session from "express-session";

const mode = process.env.MODE || "production";
const key = process.env.ENCRYPTION_KEY;

/**
 * Registers a new session using express-session
 */
const useSession = session({
    secret: key,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: mode === "production",
        maxAge: 3 * 60 * 60 * 1000 // 3 hours
    }
});

/**
 * Saves the user's sessions to res.locals.session
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 * @param {express.NextFunction} next Express Response Object
 */
const saveSession = async (req, res, next) => {
    res.locals.session = req.session;
    next();
};

export { useSession, saveSession }