import express from "express";
import { getVehicles, getVehicleTypes } from "../models/vehicle.js";
import { getVehicleTypeNav } from "../utils/templates.js";

/**
 * Renders Home Page
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export const homeController = async (_req, res) => {
    const vehicles = await getVehicles(null, null, true);
    const types = await getVehicleTypes();
    
    const vehicleTypeNav = getVehicleTypeNav(types);
    res.render('index', { title: 'Home Page', vehicles, vehicleTypeNav });
};

