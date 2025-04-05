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
			<ul>
				${isLoggedIn ? '<li><a href="/account">Account</a></li>' : ''}
				${isLoggedIn ? '<li><a href="/account/logout">Log Out</a>' : '<li><a href="/account/login">Log In</a></li>'}
				<li><a href="/#">About</a>
				${isOwner ? '<li><a href="/vehicle/new">Add Vehicle Listing</a></li>' : ""}
				${isOwner ? '<li><a href="/vehicle/type">Edit Categories</a></li>' : ""}    
				${isOwner ? '<li><a href="/account/manage">Manage Users</a></li>' : ""}
			</ul>
		</nav>
	`;
	
	return nav;
};

const getVehicleTypeNav = (types) => {
	return `
		<nav>
			<ul>
				<li><a href="/vehicle">All</a></li>
				${types.map(t => `<li><a href="/vehicle/type/${t.category_id}">${titleCase(t.name)}</a></li>`).join('')}
				<li><a href="/vehicle/uncategorized">Misc</a></li>
			</ul>
		</nav>
	`;
}

export { getNav, getVehicleTypeNav };