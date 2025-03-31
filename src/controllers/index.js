import express from "express";
import { getVehicles } from "../models/vehicle.js";

/**
 * Renders Home Page
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export const homeController = async (_req, res) => {
    const vehicles = (await getVehicles(null, null, true)).rows;
    
    res.render('index', { title: 'Home Page', vehicles: vehicles });
};

