import express from "express";
import { getPermissionLevel } from "../../models/account.js";

/**
 * Requires the user to be logged in
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 * @param {express.NextFunction} next Express Next Function
 */
export const requireLogin = async (req, res, next) => {
    if (!req.session.user) {
        req.flash("error", "You must be logged in to access this page.");
        return res.redirect("/account/login");
    }
    next();
};

/**
 * Requires the user to be an owner
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 * @param {express.NextFunction} next Express Next Function
 */
export const requireEmployeePrivilages = async (req, res, next) => {
    if (req.session.user && req.session.user.user_id && (await getPermissionLevel(req.session.user.user_id)) > 1) {
        next();
        return;
    }
    req.flash("error", "You must have employee permissions to access this page.");
    return res.redirect("/account");
};

/**
 * Requires the user to be an admin
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 * @param {express.NextFunction} next Express Next Function
 */
export const requireAdminPrivilages = async (req, res, next) => {
    if (req.session.user && req.session.user.user_id && (await getPermissionLevel(req.session.user.user_id)) > 2) {
        next();
        return;
    }
    req.flash("error", "You must be an admin to access this page.");
    return res.redirect("/account/login");
};