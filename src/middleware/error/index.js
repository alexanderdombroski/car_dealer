import express from "express";

/**
 * Throw a 404
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 * @param {express.NextFunction} next Express Next Function
 */
export const errorThrowing = async (req, res, next) => {
    const error = new Error("Couldn't find page: " + req.host + req.originalUrl);
    error.statusCode = 404;
    next(error);
};

/**
 * Catch Errors and reroute to error pages
 * 
 * @param err Express Error Object (implicitly typed)
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 * @param {express.NextFunction} next Express Next Function
 */
export const errorCatching = async (err, _req, res, _next) => {
    const code = err.statusCode || err.status || 500;
    console.error(code, err.message);
    const message = err.message;
    return res.status(code).render(`error/${code}`, {title: code, code, message});
};