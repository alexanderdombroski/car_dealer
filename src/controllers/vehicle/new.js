import express from "express";
import { vehicleMakesList, vehicleModelsList, vehicleNewCatagory, vehicleNewImages, vehicleNewListing, vehicleNewMake, vehicleNewModel, vehicleTypesList } from "../../models/vehicle.js";
import fs from "fs";
import path from "path";

/**
 * Render Vehicle Upload Page
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 */
export const vehicleUploadPageController = async (req, res) => {
    const [makes, models, categories] = await Promise.all([
        vehicleMakesList(),
        vehicleModelsList(),
        vehicleTypesList(),
    ]);
    req.useSearchInputs()

    res.render('vehicle/new', {title: "New Posting", makes, models, categories});
};

/**
 * Handle Vehicle Upload
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 */
export const vehicleUploadController = async (req, res) => {

    let categoryId = req.body.category_id;
    if (categoryId === undefined) {
        categoryId = await vehicleNewCatagory(req.body.category);
    }

    let makeId = req.body.make_id;
    if (makeId === undefined) {
        makeId = await vehicleNewMake(req.body.make);
    }

    let modelId = req.body.model_id;
    if (modelId === undefined) {
        modelId = await vehicleNewModel(makeId, categoryId, req.body.model);
    }

    const vid = await vehicleNewListing(
        req.session.user.user_id,
        modelId,
        req.body.year,
        req.body.mileage,
        req.body.desc,
        req.body.price
    );

    const oldPaths = req.files.images.map(file => file.filepath);

    const paths = await Promise.all(oldPaths.map(async oldPath => {
        const newPath = "/images/vehicles/" + path.basename(oldPath);
        await fs.promises.rename(oldPath, path.join(process.cwd(), "public", newPath));
        return newPath;
    }));

    await vehicleNewImages(vid, paths);
    console.log(paths)
    res.redirect("/vehicle/" + vid);
};