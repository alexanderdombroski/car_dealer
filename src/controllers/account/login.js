import express from "express";

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