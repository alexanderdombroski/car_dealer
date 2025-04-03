import express from "express";
import { caledarWithTimeFormat, calendarFormat } from "../../utils/date.js";
import { reviewsListUser } from "../../models/review.js";
import { inquiryList } from "../../models/inquiry.js";
import { accountEmailUpdate } from "../../models/account.js";

/**
 * Renders Account Page
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 */
export const accountController = async (req, res) => {
    const reviews = await reviewsListUser(req.session.user.user_id);
    const inquiries = await inquiryList(req.session.user.user_id);
    res.render("account/index", {title: "Account", user: req.session.user, calendarFormat, caledarWithTimeFormat, reviews, inquiries});
};


/**
 * Update a user's email
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 */
export const accountEmailController = async (req, res) => {
    await accountEmailUpdate(req.session.user.user_id, req.body.email);
    req.session.user.email = req.body.email;
    req.flash("success", "Email Successfully Updated");
    res.redirect('/account');
};