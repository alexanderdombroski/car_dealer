import { titleCase } from "./string.js";

/**
 * Returns the navigation menu.
 *
 * @param {boolean} isLoggedIn
 * @returns {string} The navigation menu.
 */
const getNav = (isLoggedIn, isOwner) => {
    const nav = `
        <nav>
            ${isLoggedIn ? '<a href="/account">Account</a>' : ''}
            ${isLoggedIn ? '<a href="/account/logout">Log Out</a>' : '<a href="/account/login">Log In</a>'}
            ${isOwner ? '<a href="/vehicle/new">Add Vehicle Listing</a>' : ""}
        </nav>
    `;
    
    return nav;
};

const getVehicleTypeNav = (types) => {
    return `
        <nav>
            ${types.map(t => `<a href="/vehicle/type/${t.category_id}">${titleCase(t.name)}</a>`).join('')}
        </nav>
    `;
}

export { getNav, getVehicleTypeNav };