import { placeholderClosure } from "../utils/queryBuilder.js";
import dbClient from "./index.js";

/**
 * Gets all vehicles, or a single vehicle, and related images and specs.
 * 
 * @param {string|null} [category=null] 
 * @param {int|null} [vehicle_id=null] 
 * @param {bool|null} isFeatured 
 */
export async function getVehicles(filterValues = {}) {
    let query = `
        SELECT
            v.vehicle_id, price, user_id,
            year, make, model, mileage,
            is_featured, is_sold,
            c.name AS category, "desc",
            ARRAY_AGG(i.image_path) AS image_paths
        FROM public.vehicle AS v
        JOIN public.model AS m ON m.model_id = v.model_id
        JOIN public.make AS mk ON m.make_id = mk.make_id
        LEFT JOIN public.vehicle_category AS c ON c.category_id = m.category_id
        JOIN public.vehicle_image AS i ON i.vehicle_id = v.vehicle_id
    `;
    
    const p = placeholderClosure();
    const filters = []
    const placeholders = []
    if (filterValues?.categoryId === null) {
        filters.push("c.category_id IS NULL");
    } else if (filterValues?.categoryId) {
        filters.push("c.category_id = " + p());
        placeholders.push(filterValues.categoryId);
    };
    if (filterValues?.vehicleId) {
        filters.push("v.vehicle_id = " + p());
        placeholders.push(filterValues.vehicleId);
    }
    if (filterValues?.isFeatured !== undefined) {
        filters.push("is_featured = " + p());
        placeholders.push(filterValues.isFeatured);
    }
    if (filterValues?.userId) {
        filters.push("user_id = " + p());
        placeholders.push(filterValues.userId);
    }
    if (filterValues?.isSold !== undefined) {
        filters.push("is_sold = " + p());
        placeholders.push(filterValues.isSold);
    }
    if (filterValues?.search) {
        const ph = p();
        filters.push(`
            (
                CAST(year AS TEXT) LIKE '%' || ${ph} || '%' OR
                make ILIKE '%' || ${ph} || '%' OR
                model ILIKE '%' || ${ph} || '%' OR
                c.name ILIKE '%' || ${ph} || '%'
            )`);
        placeholders.push(filterValues.search);
    }
    if (filters.length !== 0) {
        query += "WHERE " + filters.join(" AND ");
    }

    query += " GROUP BY v.vehicle_id, price, v.year, model, make, c.name;"

    return (await dbClient.query(query, placeholders)).rows;
}

export async function vehicleMakesList() {
    let query = `
        SELECT make_id, make FROM public.make;
    `;

    return (await dbClient.query(query)).rows;
}

export async function vehicleModelsList() {
    let query = `
        SELECT model_id, model FROM public.model;
    `;

    return (await dbClient.query(query)).rows;
}

/**
 * Creates a new vehicle listing
 * 
 * @returns {Promise<number|undefined>} vehicle_id
 */
export async function vehicleNewListing(userId, modelId, year, mileage, desc, price) {
    const query = `
        INSERT INTO public.vehicle (user_id, model_id, year, mileage, "desc", price, is_featured, is_sold, created_at, updated_at) 
        VALUES ($1, $2, $3, $4, $5, $6, false, false, NOW(), NOW())
        RETURNING vehicle_id;
    `;
    const result = await dbClient.query(query, [userId, modelId, year, mileage, desc, price]);
    return result.rows[0].vehicle_id;
}

/**
 * Creates a new vehicle model
 * 
 * @returns {Promise<number|undefined>} model_id
 */
export async function vehicleNewModel(make_id, category_id, model) {
    const query = `
        INSERT INTO public.model (make_id, category_id, model)
        VALUES ($1, $2, $3)
        RETURNING model_id;
    `;
    const result = await dbClient.query(query, [make_id, category_id, model]);
    return result.rows[0].model_id;
}

/**
 * Creates a new vehicle make
 * 
 * @returns {Promise<number|undefined>} make_id
 */
export async function vehicleNewMake(make) {
    const query = `
        INSERT INTO public.make (make)
        VALUES ($1)
        RETURNING make_id;
    `;
    const result = await dbClient.query(query, [make]);
    return result.rows[0].make_id;
}

export async function vehicleNewImages(vehicleId, imagePaths) {
    const p = placeholderClosure(2);

    const query = `
        INSERT INTO public.vehicle_image (vehicle_id, image_path) VALUES
        ${imagePaths.map(_ => `($1, ${p()})`).join(",")};
    `;

    return await dbClient.query(query, [vehicleId, ...imagePaths])
}

export async function vehicleUpdate(vehicleId, mileage, price, desc, isFeatured, isPurchased) {
    const query = `
        UPDATE public.vehicle SET 
            mileage = $2,
            price = $3,
            "desc" = $4,
            is_featured = $5,
            is_sold = $6,
            updated_at = NOW()
        WHERE vehicle_id = $1;
    `;

    return await dbClient.query(query, [vehicleId, mileage, price, desc, isFeatured, isPurchased])
}

export async function vehicleDelete(vehicleId) {
    const query = `
        DELETE FROM public.vehicle
        WHERE vehicle_id = $1;
    `;

    return await dbClient.query(query, [vehicleId]);
}

export async function vehicleImages(vehicleId) {
    const query = `
        SELECT image_path FROM public.vehicle_image
        WHERE vehicle_id = $1;
    `;
    return (await dbClient.query(query, [vehicleId])).rows;
}

export async function updateVehicleOwnership(vehicleId, userId) {
    const query = `
        UPDATE public.vehicle
        SET user_id = $2,
            is_sold = true
        WHERE vehicle_id = $1;
    `;
    return await dbClient.query(query, [vehicleId, userId]);    
}