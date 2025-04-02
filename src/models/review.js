import dbClient from "./index.js";

/**
 * Gets All Reviews of the vehicle
 */
export async function reviewsList(vehicleId) {
    const query = `
        SELECT first_name, last_name, message, r.created_at, r.updated_at, u.user_id, r.review_id, r.vehicle_id
        FROM public.review AS r
        JOIN public.user AS u ON u.user_id = r.user_id
        WHERE vehicle_id = $1;
    `;
    return await dbClient.query(query, [vehicleId]);
}

/**
 * Creates a review
 */
export async function reviewCreate(userId, vehicleId, message) {
    const query = `
        INSERT INTO public.review (user_id, vehicle_id, message) VALUES
        ($1, $2, $3);
    `;
    return await dbClient.query(query, [userId, vehicleId, message]);
}

/**
 * Updates a review
 */
export async function reviewEdit(reviewId, message) {
    const query = `
        UPDATE public.review
        SET message = $2
        WHERE review_id = $1;
    `;
    return await dbClient.query(query, [reviewId, message]);    
}

/**
 * Deletes a review
 */
export async function reviewDelete(reviewId) {
    const query = `
        DELETE FROM public.review
        WHERE review_id = $1;
    `;
    return await dbClient.query(query, [reviewId]);
}

/**
 * Get's userId associated with a review
 * @returns {Promise<number>} id of user
 */
export async function reviewUserId(reviewId) {
    const query = `
        SELECT user_id FROM public.review
        WHERE review_id = $1;
    `;
    return (await dbClient.query(query, [reviewId])).rows[0].user_id;
}

/**
 * Get's a user's reviews
 */
export async function reviewsListUser(userId) {
    const query = `
        SELECT first_name, last_name, message, r.created_at, r.updated_at, u.user_id, r.review_id, r.vehicle_id
        FROM public.review AS r
        JOIN public.user AS u ON u.user_id = r.user_id
        WHERE u.user_id = $1; 
    `;
    return (await dbClient.query(query, [userId])).rows;
}