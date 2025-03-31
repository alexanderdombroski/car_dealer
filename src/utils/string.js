export function titleCase(str) {
    return str.split(' ').map(w => capitalize(w)).join(' ');
}

export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}