const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'temp.txt');

console.log(`Starting to delete file: ${filePath}`);

fs.unlink(filePath, (err) => {
    if (err) {
        if (err.code === 'ENOENT') {
            console.error('Error: File not found:', filePath);
        } else {
            console.error('Error deleting file:', err);
        }
        return;
    }
    console.log('File deleted successfully:', filePath);
});
