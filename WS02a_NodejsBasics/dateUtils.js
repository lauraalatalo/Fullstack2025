function getCurrentDate() {
    return new Date().toLocaleDateString();
}

function formatDate(date) {
    return date.toISOString().split('T')[0];
}

module.exports = { getCurrentDate, formatDate };