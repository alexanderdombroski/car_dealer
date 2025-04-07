import argon2 from "argon2";
import dbClient from "./index.js";

/**
 * Saves a new user to the database
 */
export async function registerUser(first_name, last_name, username, email, password) {
    try {
        const now = new Date();
        console.log("Hashin password")
        const passwordHash = await argon2.hash(password);
        console.log(passwordHash)

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
    } catch (error) {
        console.error("Error saving registering user to database: ", error);
        throw new Error("Failed to register user due to a server error.");
    }
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

export async function userDetails(userId) {
    const query = `
        SELECT first_name, last_name, email
        FROM public.user
        WHERE user_id = $1;
    `;

    return (await dbClient.query(query, [userId])).rows[0];
}

/**
 * Returns the permission level of a user
 * 0: Not logged in
 * 1: Registered User
 * 2: Owner
 * 3: Admin
 * 
 * @param {number} userId 
 * @returns promise<int|undefinied>
 */
export async function getPermissionLevel(userId) {
    const query = `
        SELECT permission FROM public.user
        WHERE user_id = $1;
    `;

    const result = await dbClient.query(query, [userId]);
    if (result.rowCount === 1) return result.rows[0].permission;
    return 0;
}

/**
 * Updates a users email
 * 
 * @param {number} userId 
 * @param {string} email 
 */
export async function accountEmailUpdate(userId, email) {
    const query = `
        UPDATE public.user
        SET email = $2
        WHERE user_id = $1;
    `;

    return await dbClient.query(query, [userId, email]);
}

export async function accountList() {
    const query = `
        SELECT username, user_id, permission, first_name, last_name, email 
        FROM public.user
        ORDER BY permission DESC;
    `;

    return (await dbClient.query(query)).rows;
}

export async function accountPermissionUpdate(userId, permission) {
    const query = `
        UPDATE public.user
        SET permission = $2, updated_at = NOW()
        WHERE user_id = $1;
    `;

    return await dbClient.query(query, [userId, permission]);
}

export async function accountDelete(userId) {
    const query = `
        DELETE FROM public.user
        WHERE user_id = $1;
    `;

    return await dbClient.query(query, [userId]);
}