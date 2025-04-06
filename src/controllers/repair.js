import express from "express";
import { repairRequestCreate, repairRequestUpdate } from "../models/repair.js";

/**
 * Renders Repair Management Page
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 */
export const repairManagementPageController = async (req, res) => {
    
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

    res.redirect('/repair');
};