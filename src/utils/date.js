

function calendarFormat(date) {
    return new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' });
}

function caledarWithTimeFormat(date) {
    const newDate = new Date(date);
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    };
    return newDate.toLocaleDateString(undefined, options).replace(',','') + ' at ' + newDate.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit', hour12: true });
}

export { calendarFormat, caledarWithTimeFormat }