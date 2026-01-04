import fs from 'fs/promises';
import path from 'path';

// 1. Get the directory path from terminal arguments
// process.argv[0] is node, [1] is the script path, [2] is our argument
const targetDir: string = process.argv[2] || '.';

async function organizeFiles(directory: string): Promise<void> {
    try {
        // Resolve the absolute path
        const resolvedPath: string = path.resolve(directory);
        const files: string[] = await fs.readdir(resolvedPath);

        console.log(`Organizing: ${resolvedPath}...`);

        for (const file of files) {
            const fullPath: string = path.join(resolvedPath, file);
            const stat = await fs.lstat(fullPath);

            // Only process files, skip directories
            if (stat.isFile()) {
                const ext: string = path.extname(file).toLowerCase().replace('.', '');

                if (!ext) continue; // Skip files without extensions

                const targetFolder: string = path.join(resolvedPath, ext.toUpperCase());

                // Create the folder
                await fs.mkdir(targetFolder, { recursive: true });

                // Move the file
                const oldPath: string = fullPath;
                const newPath: string = path.join(targetFolder, file);

                await fs.rename(oldPath, newPath);
                console.log(`Moved: ${file} → ${ext.toUpperCase()}/`);
            }
        }
        console.log('✅ Organization Complete!');
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('❌ Error:', error.message);
        } else {
            console.error('❌ An unknown error occurred');
        }
    }
}

organizeFiles(targetDir);