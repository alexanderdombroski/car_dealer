/**
 * Returns the navigation menu.
 *
 * @param {boolean} isLoggedIn
 * @returns {string} The navigation menu.
 */
const getNav = (isLoggedIn) => {
    const nav = `
        <nav>
            ${isLoggedIn ? '<a href="/account">Account</a>' : ''}
            ${isLoggedIn ? '<a href="/account/logout">Log Out</a>' : '<a href="/account/login">Log In</a>'}
        </nav>
    `;
    
    return nav;
};

export { getNav };