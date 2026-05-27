import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distClientPath = path.join(__dirname, '..', 'dist', 'client');

// Create index.html
const htmlContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Anshika Tyagi</title>
    <meta name="description" content="Frontend Developer Portfolio - React, JavaScript, Firebase" />
    <link rel="stylesheet" href="/assets/styles-Dkhw3_Oa.css" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/index-CHEsV7wp.js"></script>
  </body>
</html>`;

// Write index.html to dist/client
fs.writeFileSync(path.join(distClientPath, 'index.html'), htmlContent);

console.log('✓ Generated index.html in dist/client');
