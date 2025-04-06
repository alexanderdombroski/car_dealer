export function titleCase(str) {
    return str.split(' ').map(w => capitalize(w)).join(' ');
}

export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Trims an input string and makes sure it is a string.
 * @param {string|undefined} input 
 * @returns {string} cleaned up string
 * @throws 400 error for bad request
 */
export function validate(input) {
    const trimmed = input?.trim();
    if (trimmed) return trimmed;

    const err = new Error("A required field was left blank!");
    err.statusCode = 400;
    throw err;
}