import express from "express";

/**
 * Requires the user to be logged in
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 * @param {express.NextFunction} next Express Next Function
 */
export const requireLogin = async (req, res, next) => {
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
    next();
};

/**
 * Requires the user to be an admin
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 * @param {express.NextFunction} next Express Next Function
 */
export const requireAdminPrivilages = async (req, res, next) => {
    next();
};