const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'output.txt');
const content = 'Helouu helouu.\n';

console.log('Starting to write to file...');

fs.writeFile(filePath, content, (err) => {
    if (err) {
        console.error('Error writing file:', err);
        return;
    }
    console.log(' File successfully written:', filePath);

    fs.stat(filePath, (err, stats) => {
        if (err) {
            console.error('Error checking file:', err);
            return;
        }
        console.log('File exists!');
    });
});
