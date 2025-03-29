import express from "express";
import argon2 from "argon2";

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
    console.log(req.body.username, req.body.password);


};


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
    const passwordHash = await argon2.hash(req.body.password);
    console.log(req.body.first_name, req.body.last_name, req.body.email, req.body.username, passwordHash);
    res.redirect("/account/login")
};