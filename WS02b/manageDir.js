const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'testDir');

console.log(`Attempting to remove directory: ${dirPath}`);

fs.access(dirPath, (err) => {
    if (err) {
        console.error('Error: Directory not found:', dirPath);
        return;
    }

    fs.rm(dirPath, { recursive: true, force: true }, (err) => {
        if (err) {
            console.error('Error removing directory:', err);
            return;
        }
        console.log('Directory removed successfully:', dirPath);
    });
});
