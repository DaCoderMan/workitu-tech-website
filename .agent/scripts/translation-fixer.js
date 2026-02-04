const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

// Configuration
const SRC_DIR = path.join(__dirname, '../../src/app');

// Logging
function log(msg) {
    console.log(`[TranslationAgent] ${msg}`);
}

// Recursive file walker
async function getFiles(dir) {
    const subdirs = await readdir(dir);
    const files = await Promise.all(subdirs.map(async (subdir) => {
        const res = path.resolve(dir, subdir);
        return (await stat(res)).isDirectory() ? getFiles(res) : res;
    }));
    return files.reduce((a, f) => a.concat(f), []);
}

async function fixReactivityInFile(filePath) {
    let content = await readFile(filePath, 'utf8');
    let modified = false;

    // Pattern: const { t } = useLanguage();
    // Replacement: const { t, language } = useLanguage();
    // This ensures the component re-renders when 'language' state changes.
    const regex = /const\s*{\s*t\s*}\s*=\s*useLanguage\(\);/g;
    
    if (regex.test(content)) {
        content = content.replace(regex, 'const { t, language } = useLanguage();');
        modified = true;
        log(`Fixed reactivity in: ${path.basename(filePath)}`);
    }

    if (modified) {
        await writeFile(filePath, content, 'utf8');
        return true;
    }
    return false;
}

async function run() {
    log('Starting translation reactivity check...');
    
    try {
        const files = await getFiles(SRC_DIR);
        const jsFiles = files.filter(f => f.endsWith('.js') || f.endsWith('.jsx') || f.endsWith('.tsx'));
        
        log(`Found ${jsFiles.length} component files to scan.`);
        
        let fixedCount = 0;
        for (const file of jsFiles) {
            if (await fixReactivityInFile(file)) {
                fixedCount++;
            }
        }
        
        log(`Scan complete. Fixed ${fixedCount} files.`);
        if (fixedCount > 0) {
            log('Please restart the development server to see changes.');
        }

    } catch (error) {
        console.error('Agent crashed:', error);
    }
}

run();
