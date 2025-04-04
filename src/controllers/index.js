import express from "express";
import { getVehicles } from "../models/vehicle.js";
import { getVehicleTypeNav } from "../utils/templates.js";
import { categoryList } from "../models/category.js";

/**
 * Renders Home Page
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export const homeController = async (_req, res) => {
    const vehicles = await getVehicles({isFeatured: true});
    const types = await categoryList();
    
    const vehicleTypeNav = getVehicleTypeNav(types);
    res.render('index', { title: 'Home Page', vehicles, vehicleTypeNav });
};

