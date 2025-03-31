
function placeholderClosure() {
    let i = 0;
    return () => `$${++i}`;
}

export { placeholderClosure }