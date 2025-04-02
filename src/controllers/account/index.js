import express from "express";
import { caledarWithTimeFormat, calendarFormat } from "../../utils/date.js";
import { reviewsListUser } from "../../models/review.js";

/**
 * Renders Account Page
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 */
export const accountController = async (req, res) => {
    const reviews = await reviewsListUser(req.session.user.user_id);
    res.render("account/index", {title: "Account", user: req.session.user, calendarFormat, caledarWithTimeFormat, reviews});
};
