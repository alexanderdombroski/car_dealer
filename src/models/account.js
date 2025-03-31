import argon2 from "argon2";
import dbClient from "./index.js";

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

    return await dbClient.query(query, [
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

    const result = await dbClient.query(query, [username]);
    return result.rowCount !== 0;
}

/**
 * Verifies if the provided username and password match a user in the database.
 *
 * @param {string} username - The username to check.
 * @param {string} password - The plain text password to verify.
 * @returns {Promise<object|undefined>} - A promise that resolves to the user object (excluding password_hash) if the credentials are valid.
 */
export async function verifyUserCredentials(username, password) {
    const query = `
        SELECT user_id, username, email, password_hash, first_name, last_name, permission, created_at, updated_at
        FROM public.user
        WHERE username = $1;
    `;

    const result = await dbClient.query(query, [username]);

    if (result.rowCount === 1) {
        const user = result.rows[0];
        const isPasswordValid = await argon2.verify(user.password_hash, password);

        if (isPasswordValid) {
            // Return user object without the password hash for security
            const { password_hash, ...userWithoutHash } = user;
            return userWithoutHash;
        }
    }
}

/**
 * Returns the permission level of a user
 * 0: Not logged in
 * 1: Registered User
 * 2: Owner
 * 3: Admin
 * 
 * @param {number} user_id 
 * @returns promise<int|undefinied>
 */
export async function getPermissionLevel(user_id) {
    const query = `
        SELECT permission FROM public.user
        WHERE user_id = $1;
    `;

    const result = await dbClient.query(query, [user_id]);
    if (result.rowCount === 1) return result.rows[0].permission;
    return 0;
}