const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'watch.txt');

console.log(`Watching for changes in: ${filePath}`);

fs.watch(filePath, (eventType, filename) => {
    if (filename) {
        console.log(`File "${filename}" was modified. Event type: ${eventType}`);
        
        // Read and display the new content
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                return;
            }
            console.log(`New file content:\n${data}`);
        });
    } else {
        console.log('Filename not provided.');
    }
});
