function generateUniqueId() {
    // Generate a random number and convert it to base 36 (numbers + letters)
    // Use Date.now() to get a timestamp and add a random number to ensure uniqueness
    return '_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

module.exports = generateUniqueId;