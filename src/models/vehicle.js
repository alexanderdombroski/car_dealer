import { placeholderClosure } from "../utils/queryBuilder.js";
import dbClient from "./index.js";

/**
 * Gets all vehicles, or a single vehicle, and related images and specs.
 * 
 * @param {string|null} [category=null] 
 * @param {int|null} [vehicle_id=null] 
 * @param {bool|null} isFeatured 
 */
export async function getVehicles(category = null, vehicle_id = null, isFeatured = null) {
    let query = `
        SELECT
            v.vehicle_id, price, user_id,
            year, make, model, 
            is_featured, is_sold,
            c.name AS category, "desc",
            ARRAY_AGG(i.image_path) AS image_paths,
            ARRAY_AGG(i.alt_text) AS alt_texts
        FROM public.vehicle AS v
        JOIN public.model AS m ON m.model_id = v.model_id
        JOIN public.make AS mk ON m.make_id = mk.make_id
        JOIN public.vehicle_category AS c ON c.category_id = m.category_id
        JOIN public.vehicle_image AS i ON i.vehicle_id = v.vehicle_id
    `;
    
    const p = placeholderClosure();
    const filters = []
    const placeholders = []
    if (category) {
        filters.push("c.category_id = " + p())
        placeholders.push(category);
    };
    if (vehicle_id) {
        filters.push("v.vehicle_id = " + p());
        placeholders.push(vehicle_id);
    }
    if (isFeatured !== null) {
        filters.push("is_featured = " + p());
        placeholders.push(isFeatured);
    }
    if (filters.length !== 0) {
        query += "WHERE " + filters.join(" AND ");
    }

    query += " GROUP BY v.vehicle_id, price, v.year, model, make, c.name;"

    return await dbClient.query(query, placeholders);
}

export async function getVehicleTypes() {
    let query = `
        SELECT * FROM public.vehicle_category;
    `;

    return dbClient.query(query);
}