import express from 'express';
import { getVehicles } from '../../models/vehicle.js';
import { reviewsList } from '../../models/review.js';
import { caledarWithTimeFormat } from '../../utils/date.js';

/**
 * Display Page with all Vehicles
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 */
export const vehiclesPageController = async (req, res) => {
    const vehicles = await getVehicles(req.params.id);
    res.render("vehicle/index", {title: "Listings", vehicles});
};

/**
 * Display Page with vehicle details
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 */
export const vehicleDetailsPageController = async (req, res) => {
    const vehicle = (await getVehicles(null, req.params.id))[0];
    const reviews = (await reviewsList(req.params.id)).rows;
    res.render("vehicle/details", {title: "Listing Details", vehicle, reviews, caledarWithTimeFormat, isLoggedIn: res.locals.isLoggedIn, user: req.session.user});
};

