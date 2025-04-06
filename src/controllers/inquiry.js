import express from "express";
import { getVehicles, updateVehicleOwnership } from "../models/vehicle.js";
import { userDetails } from "../models/account.js";
import { inquiryDelete, inquiryFullList, inquiryInsert, inquiryResponded } from "../models/inquiry.js";
import { caledarWithTimeFormat } from "../utils/date.js";
import { validate } from "../utils/string.js";

/**
 * Renders Inquiry Page
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 */
export const inquiryPageController = async (req, res) => {
    const vehicle = (await getVehicles({vehicleId: req.params.id}))[0];
    const owner = await userDetails(vehicle.user_id);

    res.render("inquiry/index", {title: "Inquiry Request", vehicle, owner});
};


/**
 * Creates a new inquiry
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 */
export const inquiryHandlerController = async (req, res) => {
    await inquiryInsert(req.session.user.user_id, req.params.id, validate(req.body.subject), validate(req.body.message));
    req.flash("success", "Inquiry successfully sent!");
    res.redirect("/account");
};

/**
 * Renders Inquiry Management Page
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 */
export const inquiryManagePageController = async (req, res) => {
    req.useSearchInputs();
    const inquiries = await inquiryFullList(req.query.search);
    res.render("inquiry/manage", {title: "User Inquiries", inquiries, caledarWithTimeFormat })
};

/**
 * Respond to an Inquiry
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 */
export const inquiryUpdateController = async (req, res) => {
    await inquiryResponded(req.params.iid, !!req.body.responded);
    req.flash("success", "Inquiry successfully updated");
    res.redirect('/inquiry');
};

/**
 * Delete an Inquiry
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 */
export const inquiryDeleteController = async (req, res) => {
    if (req.body.sell) {
        await updateVehicleOwnership(req.params.id, req.body.user_id);
    }
    await inquiryDelete(req.params.iid);
    req.flash("success", "Inquiry successfully deleted");
    res.redirect('/inquiry');
};