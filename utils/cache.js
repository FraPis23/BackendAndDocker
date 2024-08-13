import fs from 'fs-extra';

export function clearCache(){
    const cacheDir = process.env.CACHE_DIR;

    fs.emptyDir(cacheDir, error => {
        if (error) return console.error(error);
        console.log('Cache svuotata');
    });
}