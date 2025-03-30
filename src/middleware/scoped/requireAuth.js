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
    if (!req.session.userId) {
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
export const requireOwnerPrivilages = async (req, res, next) => {
    if (req.session.userId && (await getPermissionLevel(req.session.userId)) > 1) {
        next();
        return;
    }
    req.flash("error", "You must have owner permissions to access this page.");
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
    if (req.session.userId && (await getPermissionLevel(req.session.userId)) > 2) {
        next();
        return;
    }
    req.flash("error", "You must be an admin to access this page.");
    return res.redirect("/account/login");
};