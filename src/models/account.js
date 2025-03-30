import pool from "../db/init.js";
import argon2 from "argon2";

/**
 * Saves a new user to the database
 */
export async function registerUser(first_name, last_name, username, email, password) {
    const now = new Date();
    const passwordHash = await argon2.hash(password);

    const query = `
        INSERT INTO public.user (first_name, last_name, username, email, password_hash, permission, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $7)
        RETURNING user_id, username, email, first_name, last_name;
    `;

    return await pool.query(query, [
        first_name,
        last_name,
        username,
        email,
        passwordHash,
        1,
        now
    ]);
}

/**
 * Checks if a username already exists in the database.
 */
export async function userExists(username) {
    const query = `
        SELECT user_id FROM public.user
        WHERE username = $1;
    `;

    const result = await pool.query(query, [username]);
    return result.rows.length !== 0;
}