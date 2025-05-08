const fs = require('fs').promises;

async function ListFiles() {
    try {
        const files = await fs.readdir('.');
        for (const file of files) {
            console.log(files);
        }
    } catch (err) {
        console.error(err);
    }
}
ListFiles();