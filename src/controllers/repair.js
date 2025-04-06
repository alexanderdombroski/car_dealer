import express from "express";
import { repairRequestCreate, repairRequestFullList, repairRequestUpdate, statusList } from "../models/repair.js";
import { calendarFormat } from "../utils/date.js";

/**
 * Renders Repair Management Page
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 */
export const repairManagementPageController = async (req, res) => {
    const repairs = await repairRequestFullList();
    const statuses = await statusList();
    req.useSearchInputs();

    res.render('repair', {title: "Upcoming Repairs", repairs, calendarFormat, statuses})
};

/**
 * Create new repair request
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 */
export const repairRequestHandlerController = async (req, res) => {
    await repairRequestCreate(req.session.user.user_id, req.body.vehicle_id, req.body.subject, req.body.desc);
    res.redirect("/account");
};

/**
 * Updates repair status
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 */
export const repairStatusController = async (req, res) => {
    await repairRequestUpdate(req.params.id, req.body.status_id);
    req.flash("Status successfully updated");
    res.redirect('/repair');
};