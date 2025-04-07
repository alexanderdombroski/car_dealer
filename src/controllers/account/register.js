import express from "express";
import { registerUser, userExists } from "../../models/account.js";
import { validate } from "../../utils/string.js";

/**
 * Render Register Page
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 */
export const registerPageController = async (_req, res) => {
    res.render('account/register', {title: "Create Account"});
};

/**
 * Controller to register a new user
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 */
export const registerHandlerController = async (req, res) => {
    if (req.body.password !== req.body.confirm_password) {
        req.flash("error", "Passwords don't match!");
        return res.redirect('/account/register');
    }

    if (await userExists(req.body.username)) {
        req.flash("error", "Username already taken!");
        return res.redirect("/account/register");
    }

    registerUser(
        validate(req.body.first_name), 
        validate(req.body.last_name), 
        validate(req.body.username), 
        validate(req.body.email), 
        validate(req.body.password)
    );

    req.flash("success", `Registered new user under the username: ${req.body.username}`);
    res.redirect("/account/login");
};