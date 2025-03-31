import express from "express";
import { calendarFormat } from "../../utils/date.js";

/**
 * Renders Account Page
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 */
export const accountController = async (req, res) => {
    res.render("account/index", {title: "Account", user: req.session.user, calendarFormat})
};
