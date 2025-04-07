import express from "express";
import { userExists, verifyUserCredentials } from "../../models/account.js";
import { validate } from "../../utils/string.js";

/**
 * Renders login page
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 */
export const loginPageController = async (req, res) => {
    if (res.locals.isLoggedIn) {
        return res.redirect("/account");
    }
    res.render("account/login", {title: "Login"})
};

/**
 * Handles logic to allow user to log in
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 */
export const loginHandlerController = async (req, res) => {        
    const user = await verifyUserCredentials(validate(req.body.username), validate(req.body.password));
    
    if (user) {
        req.session.user = user;

        req.session.save((err) => {
            if (err) {
                console.error("Error saving session:", err);
                req.flash("error", "An error occurred during login.");
                return res.redirect("/account/login");
            } else {
                return res.redirect("/account"); 
            }
        });
        return;
    }

    if (await userExists(req.body.username)) {
        req.flash("error", "Incorrect Password");
        return res.redirect("/account/login");
    }
    
    req.flash("error", "Invalid Username");
    return res.redirect("/account/login");
};

/**
 * Destroy the session to log the user out
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 */
export const logoutController = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.clearCookie('connect.sid');
        return res.redirect("/account/login"); 
    });
};