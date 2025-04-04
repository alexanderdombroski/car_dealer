import dbClient from "./index.js";

/**
 * Gets a list of categories
 */
export async function categoryList() {
    let query = `
        SELECT * FROM public.vehicle_category;
    `;

    return (await dbClient.query(query)).rows;
}

/**
 * Creates a new vehicle category
 * 
 * @returns {Promise<number|undefined>} category_id
 */
export async function categoryNew(name) {
    const query = `
        INSERT INTO public.vehicle_category (name)
        VALUES ($1)
        RETURNING category_id;
    `;
    const result = await dbClient.query(query, [name]);
    return result.rows[0].category_id;
}

/**
 * Updates vehicle category
 */
export async function categoryUpdate(categoryId, name) {
    const query = `
        UPDATE public.vehicle_category
        SET name = $2
        WHERE category_id = $1;
    `;

    return await dbClient.query(query, [categoryId, name])
}

/**
 * Deletes Vehicle category
 */
export async function categoryDelete(categoryId) {
    const query = `
        DELETE FROM public.vehicle_category
        WHERE category_id = $1;
    `;
    
    return await dbClient.query(query, [categoryId])
}