import express from 'express';

/**
 * Display Page with all Vehicles
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 */
export const vehiclesPageController = async (req, res) => {
    
    res.render("vehicle")
};

/**
 * Display Page with vehicle details
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 */
export const vehicleDetailsPageController = async (req, res) => {
    
    res.render("vehicle/details")
};

