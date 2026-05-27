import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distClientPath = path.join(__dirname, '..', 'dist', 'client');
const assetsPath = path.join(distClientPath, 'assets');

// Get all files in assets directory
const files = fs.readdirSync(assetsPath);

// Find the CSS and JS files dynamically
const cssFile = files.find(f => f.endsWith('.css'));
const jsFile = files.find(f => f.startsWith('index-') && f.endsWith('.js'));

if (!cssFile || !jsFile) {
  console.error('Error: Could not find required CSS or JS files in assets directory');
  process.exit(1);
}

// Create index.html with dynamic asset names
const htmlContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Anshika Tyagi</title>
    <meta name="description" content="Frontend Developer Portfolio - React, JavaScript, Firebase" />
    <link rel="stylesheet" href="/assets/${cssFile}" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/${jsFile}"></script>
  </body>
</html>`;

// Write index.html to dist/client
fs.writeFileSync(path.join(distClientPath, 'index.html'), htmlContent);

console.log('✓ Generated index.html in dist/client');
console.log(`  CSS: ${cssFile}`);
console.log(`  JS: ${jsFile}`);
