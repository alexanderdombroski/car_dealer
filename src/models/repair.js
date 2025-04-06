import dbClient from "./index.js";

export async function repairRequestCreate(userId, vehicleId, subject, desc) {
    const query = `
        INSERT INTO public.repair_request 
        (user_id, vehicle_id, subject, "desc", created_at, updated_at)
        VALUES ($1, $2, $3, $4, NOW(), NOW());
    `;

    return dbClient.query(query, [userId, vehicleId, subject, desc]);
}

export async function repairRequestUpdate() {
    const query = `
        
    `;

    return dbClient.query(query, []);
}

export async function repairRequestList(userId) {
    const query = `
        SELECT status, year, model, subject, r.created_at AS created_at, r.updated_at AS updated_at, r."desc" AS "desc" FROM public.repair_request AS r
        JOIN public.vehicle AS v ON v.vehicle_id = r.vehicle_id
        JOIN public.model AS M on v.model_id = m.model_id
        JOIN public.repair_request_status AS s ON s.status_id = r.status_id
        WHERE r.user_id = $1
        ORDER BY r.updated_at DESC;
    `;

    return (await dbClient.query(query, [userId])).rows;
}

