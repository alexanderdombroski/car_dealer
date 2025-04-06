import { placeholderClosure } from "../utils/queryBuilder.js";
import dbClient from "./index.js";

export async function inquiryInsert(userId, vehicleId, subject, message) {
    const query = `
        INSERT INTO public.inquiry (user_id, vehicle_id, subject, message, created_at) VALUES 
        ($1, $2, $3, $4, NOW());
    `;
    
    return await dbClient.query(query, [userId, vehicleId, subject, message]);
}

export async function inquiryList(userId, vehicleId) {
    let query = `
        SELECT * FROM public.inquiry
    `;

    const p = placeholderClosure()
    const placeholders = [];
    if (userId || vehicleId) query += " WHERE ";
    if (userId) {
        query += " user_id = " + p();
        placeholders.push(userId);
    }
    if (vehicleId) {
        query += " vehicle_id " + p();
        placeholders.push(vehicleId);
    }
    query += " ORDER BY created_at;";

    return (await dbClient.query(query, placeholders)).rows;
}

export async function inquiryFullList(search) {
    let query = `
        SELECT i.inquiry_id, i.user_id, i.vehicle_id,
            subject, message, responded, i.created_at AS created_at,
            year, model, price, mileage,
            email, username, first_name, last_name
        FROM public.inquiry AS i
        JOIN public.vehicle AS v ON i.vehicle_id = v.vehicle_id
        JOIN public.user AS u ON i.user_id = u.user_id
        JOIN public.MODEL AS m ON v.model_id = m.model_id
    `;

    if (search) {
        query += ` WHERE
            u.username ILIKE '%' || $1 || '%' OR
            u.first_name ILIKE '%' || $1 || '%' OR
            u.last_name ILIKE '%' || $1 || '%' OR
            m.model ILIKE '%' || $1 || '%' OR
            CAST(v.year AS TEXT) LIKE '%' || $1 || '%' OR
            u.email ILIKE '%' || $1 || '%'
        `;
    }
    query += " ORDER BY i.created_at DESC;";

    const placeholders = search ? [search] : [];
    return (await dbClient.query(query, placeholders)).rows;
}

export async function inquiryResponded(inquiryId, responded) {
    const query = `
        UPDATE public.inquiry
        SET responded = $2
        WHERE inquiry_id = $1;
    `;
    return await dbClient.query(query, [inquiryId, responded]);    
}

export async function inquiryDelete(inquiryId) {
    const query = `
        DELETE FROM public.inquiry
        WHERE inquiry_id = $1;
    `;
    return await dbClient.query(query, [inquiryId]);
}