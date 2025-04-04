import express from "express";
import { categoryDelete, categoryList, categoryUpdate } from "../../models/category.js";



/**
 * Show Category Edit Page
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 */
export const categoryPageController = async (_req, res) => {
    const categories = await categoryList();
    
    res.render('vehicle/type', {title: "Edit Categories", categories});
};

/**
 * Edit a category
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 */
export const categoryEditController = async (req, res) => {
    await categoryUpdate(req.params.id, req.body.name);

    req.flash("success", "Category successfully updated.")
    res.redirect('/vehicle/type');
};


/**
 * Delete a category
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 */
export const categoryDeleteController = async (req, res) => {
    await categoryDelete(req.params.id);

    req.flash("success", "Category successfully deleted. Vehicles in this category are now uncategorized.")
    res.redirect('/vehicle/type');
};