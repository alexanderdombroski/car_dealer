import express from "express";

/**
 * Global Middleware to store a flash function and maintain flash state to show messages and alerts.
 * Use req.flash(type, message) to display a message.
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 * @param {express.NextFunction} next Express Next Function
 */
const flashMessages = (req, res, next) => {
    if (!req.session) {
        throw new Error("Flash middleware requires session support. Use `express-session`.");
    }
 
    // Initialize flash storage
    req.session.flash = req.session.flash || [];
 
    /**
     * Display an alert to the user's current session.
     * 
     * @param {string} type 'error' or 'success'
     * @param {string} message The message to display
     */
    req.flash = (type, message) => {
        req.session.flash.push({ type, message });
    };
 
    // Move flash messages to `res.locals.flash` for immediate use
    res.locals.flash = [...req.session.flash];
 
    // Clear flash messages after they have been retrieved
    req.session.flash = [];
 
    next();
};
 
export default flashMessages;