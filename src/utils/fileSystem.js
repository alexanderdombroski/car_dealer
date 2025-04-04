import fs from 'fs';

/**
 * Checks if a file exists asynchronously.
 *
 * @param {string} filePath - The path to the file.
 * @returns {Promise<boolean>} - A promise that resolves to true if the file exists, false otherwise.
 */
export async function fileExists(filePath) {
    try {
        await fs.promises.access(filePath, fs.constants.F_OK);
        return true;
    } catch (error) {
        if (error.code === 'ENOENT') {
            return false; // File does not exist
        } else {
            // Other error (e.g., permissions issue)
            console.error(`Error checking file existence for ${filePath}:`, error);
            return false; 
        }
    }
}