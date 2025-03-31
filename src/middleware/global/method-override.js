import express from "express";
import methodOverride from "method-override";

/**
 * Remaps _method to method
 * 
 * @param {express.Request} req Express Request Object
 * @param {express.Response} res Express Response Object
 */
const customOverride = async (req, _res) => {
    if (req.method !== "POST") return;
    const method = req.body?._method?.toUpperCase()
    if (["PUT", "PATCH", "DELETE"].includes(method)) {
        delete req.body._method;
        req.method = method;
        return method;
    }
};

/**
 * Allows you to reroute POST requests to PUT, DELETE, and PATCH
 */
const postMethodOverride = methodOverride(customOverride);

export default postMethodOverride;