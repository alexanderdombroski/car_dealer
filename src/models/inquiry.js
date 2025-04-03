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