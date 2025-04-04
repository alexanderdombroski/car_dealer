
function placeholderClosure(start = 1) {
    let i = start;
    return () => `$${i++}`;
}

export { placeholderClosure }