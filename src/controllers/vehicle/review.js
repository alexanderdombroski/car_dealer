import express from "express";
import { getPermissionLevel } from "../../models/account.js";
import { reviewCreate, reviewDelete, reviewEdit, reviewUserId } from "../../models/review.js";

/**
 * Handle when the user submits a review
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 */
export const reviewCreationController = async (req, res) => {
    await reviewCreate(req.session.user.user_id, req.params.id, req.body.message);
    req.flash("success", "Review successfully submitted!");
    res.redirect("/vehicle/" + req.params.id);
};

/**
 * Handle when a user edits a review
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 */
export const reviewEditController = async (req, res) => {
    await reviewEdit(req.params.rid, req.body.message);
    req.flash("success", "Review successfully updated");
    return res.redirect("/vehicle/" + req.params.id);
};

/**
 * Handle when a user deletes a review
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 */
export const reviewDeleteController = async (req, res) => {
    await reviewDelete(req.params.rid);
    req.flash("success", "Review successfully deleted");
    return res.redirect("/vehicle/" + req.params.id);
};