#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Create dist/swagger directory
const swaggerDir = path.join(__dirname, '..', 'dist', 'swagger');
if (!fs.existsSync(swaggerDir)) {
  fs.mkdirSync(swaggerDir, { recursive: true });
}

// Copy Swagger UI assets
const swaggerUiPath = path.join(__dirname, '..', 'node_modules', 'swagger-ui-dist');
const files = fs.readdirSync(swaggerUiPath);

files.forEach(file => {
  if (file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.map') || file.endsWith('.png')) {
    fs.copyFileSync(
      path.join(swaggerUiPath, file),
      path.join(swaggerDir, file)
    );
  }
});

// Copy bundled OpenAPI spec
fs.copyFileSync(
  path.join(__dirname, '..', 'dist', 'openapi.json'),
  path.join(swaggerDir, 'openapi.json')
);

// Copy GBA logo to swagger directory
const docsDir = path.join(__dirname, '..', 'docs');
const logoPath = path.join(docsDir, 'logo.png');
if (fs.existsSync(logoPath)) {
  fs.copyFileSync(logoPath, path.join(swaggerDir, 'logo.png'));
}

// Copy logo to root dist for easier reference
if (fs.existsSync(logoPath)) {
  fs.copyFileSync(logoPath, path.join(__dirname, '..', 'dist', 'logo.png'));
}

// Create custom Swagger UI HTML with Green Button branding
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Green Button ESPI API - Swagger UI</title>
  <link rel="stylesheet" type="text/css" href="./swagger-ui.css" />
  <link rel="icon" type="image/png" href="./logo.png" />
  <style>
    html {
      box-sizing: border-box;
      overflow: -moz-scrollbars-vertical;
      overflow-y: scroll;
    }
    *, *:before, *:after {
      box-sizing: inherit;
    }
    body {
      margin: 0;
      padding: 0;
    }
    /* GBA Logo in Swagger UI topbar */
    .topbar {
      background-color: #10a54a !important;
    }
    .topbar::before {
      content: '';
      background-image: url('./logo.png');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      width: 180px;
      height: 50px;
      display: inline-block;
      margin: 10px 20px;
    }
    .topbar .link {
      display: flex;
      align-items: center;
    }
    .topbar .link img {
      max-height: 40px;
      margin-right: 10px;
    }
    .swagger-ui .topbar .download-url-wrapper {
      display: flex;
      align-items: center;
    }
    .swagger-ui .topbar .download-url-wrapper .download-url-button {
      background-color: #0d8c3e !important;
    }
    .swagger-ui .btn.authorize {
      background-color: #10a54a !important;
      border-color: #10a54a !important;
    }
    .swagger-ui .btn.execute {
      background-color: #10a54a !important;
      border-color: #10a54a !important;
    }
    /* Link to Redocly docs */
    .custom-nav {
      position: fixed;
      top: 60px;
      right: 20px;
      z-index: 1000;
      background: white;
      padding: 10px 20px;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .custom-nav a {
      color: #10a54a;
      text-decoration: none;
      font-weight: 600;
    }
    .custom-nav a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="custom-nav">
    <a href="../index.html">📖 View Documentation (Redocly)</a>
  </div>
  <div id="swagger-ui"></div>
  <script src="./swagger-ui-bundle.js"></script>
  <script src="./swagger-ui-standalone-preset.js"></script>
  <script>
    window.onload = function() {
      window.ui = SwaggerUIBundle({
        url: "./openapi.json",
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        plugins: [
          SwaggerUIBundle.plugins.DownloadUrl
        ],
        layout: "StandaloneLayout",
        // Green Button Alliance branding
        customSiteTitle: "Green Button ESPI API",
        tryItOutEnabled: true
      });
    };
  </script>
</body>
</html>`;

fs.writeFileSync(path.join(swaggerDir, 'index.html'), html);

console.log('✅ Swagger UI built successfully at dist/swagger/');
console.log('   - Redocly docs: dist/index.html');
console.log('   - Swagger UI: dist/swagger/index.html');
