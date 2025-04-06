import express from 'express';
import fs from "fs";
import path from "path";

import { getVehicles, vehicleDelete, vehicleImages, vehicleUpdate } from '../../models/vehicle.js';
import { reviewsList } from '../../models/review.js';
import { caledarWithTimeFormat } from '../../utils/date.js';
import { fileExists } from '../../utils/fileSystem.js';
import { getVehicleTypeNav } from '../../utils/templates.js';
import { categoryList, categoryNew, vehicleCategoryUpdate } from '../../models/category.js';

/**
 * Display Page with all Vehicles
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 */
export const vehiclesPageController = async (req, res) => {
    const types = await categoryList();
    const vehicleTypeNav = getVehicleTypeNav(types);
    
    const vehicles = await getVehicles({categoryId: req.params.id, search: req.query.search, isSold: false});
    res.render("vehicle/index", {title: "Listings", vehicles, vehicleTypeNav});
};

/**
 * Display Page with vehicle details
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 */
export const vehicleDetailsPageController = async (req, res) => {
    const vehicle = (await getVehicles({vehicleId: req.params.id}))[0];
    const reviews = (await reviewsList(req.params.id)).rows;
    const categories = await categoryList();
    const vehicleTypeNav = getVehicleTypeNav(categories);

    req.useSearchInputs();
    res.render("vehicle/details", {title: "Listing Details", vehicle, reviews, caledarWithTimeFormat, isLoggedIn: res.locals.isLoggedIn, user: req.session.user, categories, vehicleTypeNav});
};

/**
 * Update Vehicle Details
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 */
export const vehicleDetailsUpdateController = async (req, res) => {
    let categoryId = req.body.category_id;
    if (categoryId === undefined) {
        categoryId = await categoryNew(req.body.category);
    }

    Promise.all([
        vehicleCategoryUpdate(req.params.id, categoryId),
        vehicleUpdate(req.params.id, req.body.mileage, req.body.price, req.body.desc, !!req.body.is_featured, !!req.body.is_sold)
    ]);

    req.flash("success", "Vehicle Listing Updated")
    res.redirect('/vehicle/' + req.params.id);
};

/**
 * Delete Vehicle
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 */
export const vehicleDeletionController = async (req, res) => {
    const imageObjects = await vehicleImages(req.params.id);

    await Promise.all(imageObjects.map(async obj => {
        const fullPath = path.join(process.cwd(), "public", obj.image_path);
        if (await fileExists(fullPath)) {
            await fs.promises.unlink(fullPath);
        }
    }));
    
    await vehicleDelete(req.params.id)

    res.redirect('/vehicle');
};

/**
 * Display Page with all Vehicles without a category
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 */
export const vehiclesUncategorizedPageController = async (_req, res) => {
    const types = await categoryList();
    const vehicleTypeNav = getVehicleTypeNav(types);
    
    const vehicles = await getVehicles({categoryId: null, isSold: false});
    res.render("vehicle/index", {title: "Listings", vehicles, vehicleTypeNav});
};