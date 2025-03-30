import express from "express";
import { registerUser, userExists, verifyUserCredentials } from "../../models/account.js";

/**
 * Renders login page
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 */
export const loginPageController = async (req, res) => {
    
    
    res.render("account/login", {title: "Login"})
};

/**
 * Handles logic to allow user to log in
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 */
export const loginHandlerController = async (req, res) => {        
    const user = await verifyUserCredentials(req.body.username, req.body.password);
    
    if (user) {
        req.session.userId = user.user_id;
        req.session.username = user.username;
        req.session.email = user.email;
        req.session.first_name = user.first_name
        req.session.last_name = user.last_name

        req.session.save((err) => {
            if (err) {
                console.error("Error saving session:", err);
                req.flash("error", "An error occurred during login.");
                res.redirect("/account/login");
            } else {
                res.redirect("/account"); 
            }
        });
        return;
    }

    if (await userExists(req.body.username)) {
        req.flash("error", "Incorrect Password");
        res.redirect("/account/login");
        return;
    }
    
    req.flash("error", "Invalid Username");
    res.redirect("/account/login");
    return;
};
