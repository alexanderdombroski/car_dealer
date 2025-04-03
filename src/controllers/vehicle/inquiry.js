import express from "express";
import { getVehicles } from "../../models/vehicle.js";
import { userDetails } from "../../models/account.js";
import { inquiryInsert } from "../../models/inquiry.js";

/**
 * Renders Inquiry Page
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 */
export const inquiryPageController = async (req, res) => {
    const vehicle = (await getVehicles(null, req.params.id))[0]
    const owner = await userDetails(vehicle.user_id);

    res.render("vehicle/inquiry", {title: "Inquiry Request", vehicle, owner});
};


/**
 * Creates a new inquiry
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 */
export const inquiryHandlerController = async (req, res) => {
    await inquiryInsert(req.session.user.user_id, req.params.id, req.body.subject, req.body.message);
    req.flash("success", "Inquiry successfully sent!")
    res.redirect("/account");
};
