import { titleCase } from "./string.js";

/**
 * Returns the navigation menu.
 *
 * @param {boolean} isLoggedIn
 * @returns {string} The navigation menu.
 */
const getNav = (isLoggedIn, permission) => {
	const isEmployee = permission > 1;
	const isOwner = permission > 2;
	const nav = `
		<nav>
			<ul>
				${isLoggedIn ? '<li><a href="/account">Account</a></li>' : ''}
				<li><a href="/#">About</a>
				${isLoggedIn ? '<li><a href="/account/logout">Log Out</a>' : '<li><a href="/account/login">Log In</a></li>'}
				${isOwner ? '<li><a href="/vehicle/new">Add Listing</a></li>' : ""}
				${isOwner ? '<li><a href="/vehicle/type">Edit Categories</a></li>' : ""}    
				${isOwner ? '<li><a href="/account/manage">Manage Users</a></li>' : ""}
				${isEmployee ? '<li><a href="/inquiry">Inquiries</a></li>' : ""}
				${isEmployee ? '<li><a href="/repair">Repairs</a></li>' : ""}
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