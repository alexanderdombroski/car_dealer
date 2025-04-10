import express from "express";
import { vehicleMakesList, vehicleModelsList, vehicleNewImages, vehicleNewListing, vehicleNewMake, vehicleNewModel } from "../../models/vehicle.js";
import fs from "fs";
import path from "path";
import { categoryNew, categoryList } from "../../models/category.js";
import { validate } from "../../utils/string.js";

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
        categoryList(),
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
        categoryId = await categoryNew(validate(req.body.category));
    }

    let makeId = req.body.make_id;
    if (makeId === undefined) {
        makeId = await vehicleNewMake(validate(req.body.make));
    }

    let modelId = req.body.model_id;
    if (modelId === undefined) {
        modelId = await vehicleNewModel(makeId, categoryId, validate(req.body.model));
    }

    const vid = await vehicleNewListing(
        req.session.user.user_id,
        modelId,
        validate(req.body.year),
        validate(req.body.mileage),
        validate(req.body.desc),
        validate(req.body.price)
    );

    const oldPaths = req.files.images.map(file => file.filepath);

    const paths = await Promise.all(oldPaths.map(async oldPath => {
        const newPath = "/images/vehicles/" + path.basename(oldPath);
        await fs.promises.rename(oldPath, path.join(process.cwd(), "public", newPath));
        return newPath;
    }));

    await vehicleNewImages(vid, paths);
    res.redirect("/vehicle/" + vid);
};