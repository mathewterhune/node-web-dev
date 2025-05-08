const fs = require('fs').promises;

async function ListFiles() {
    try {
        var dir = '.';
        if(process.argv[2]) dir  = process.argv[2];

        const files = await fs.readdir('.');

        for (let fn of files) {
            console.log(fn);
        }
    } catch (err) {
        console.error(err);
    }
}
ListFiles();