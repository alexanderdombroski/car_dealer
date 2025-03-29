import express from "express";

/**
 * Renders Home Page
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export const homeController = async (_req, res) => {
    res.render('index', { title: 'Home Page' });
};

