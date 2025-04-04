import express from "express";
import { accountDelete, accountList, accountPermissionUpdate } from "../../models/account.js";

const roles = {
    1: "user",
    2: "employee",
    3: "owner"
};

/**
 * Renders account manage page
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 */
export const accountManagePageController = async (req, res) => {
    req.useSearchInputs();
    const users = await accountList();

    res.render("account/manage", {title: "Manage User Permissions", roles, users})
};

/**
 * Update a user's permission
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 */
export const accountPermissionController = async (req, res) => {
    console.log(req.params.id, req.body.permission_id);
    await accountPermissionUpdate(req.params.id, req.body.permission_id);
    req.flash("success", "Updated user permission");
    res.redirect("/account/manage");
};

/**
 * Delete an Account
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 */
export const accountDeleteController = async (req, res) => {
    await accountDelete(req.params.id);
    
    req.flash("success", "Account Deleted");
    res.redirect("/account/manage");
};