const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const PRODUCTS_PATH = path.join(__dirname, '../../src/data/projects.json');

async function checkUrl(url) {
    return new Promise((resolve) => {
        if (!url) {
            resolve({ url, status: 'N/A', ok: false });
            return;
        }
        
        const client = url.startsWith('https') ? https : http;
        const req = client.request(url, { method: 'HEAD', timeout: 5000 }, (res) => {
            resolve({ url, status: res.statusCode, ok: res.statusCode >= 200 && res.statusCode < 400 });
        });
        
        req.on('error', (e) => {
            resolve({ url, status: 'ERROR', ok: false, error: e.message });
        });
        
        req.on('timeout', () => {
            req.destroy();
            resolve({ url, status: 'TIMEOUT', ok: false });
        });
        
        req.end();
    });
}

async function runQA() {
    console.log('🕵️  Starting QA Agent...');
    
    let projects = [];
    try {
        const data = fs.readFileSync(PRODUCTS_PATH, 'utf8');
        projects = JSON.parse(data);
    } catch (e) {
        console.error('❌ Failed to read projects.json');
        process.exit(1);
    }
    
    console.log(`Checking ${projects.length} projects for broken links...`);
    
    let issues = 0;
    
    for (const p of projects) {
        if (p.link) {
            const result = await checkUrl(p.link);
            if (!result.ok) {
                console.log(`❌ Project "${p.title}" Link broken: ${p.link} (${result.status})`);
                issues++;
            } else {
                // console.log(`✅ Project "${p.title}" OK`);
            }
        }
    }
    
    if (issues === 0) {
        console.log('✅ All project links are healthy.');
    } else {
        console.log(`⚠️  Found ${issues} broken links.`);
    }
    
    console.log('🏁 QA Agent finished.');
}

runQA();
