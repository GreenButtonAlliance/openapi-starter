# CI/CD Workflows

## OpenAPI CI/CD Pipeline

This workflow (`openapi-ci.yml`) provides automated validation, testing, and documentation deployment for the Green Button OpenAPI specification.

### Workflow Jobs

#### 1. Validate (runs on all PRs and pushes)
- **Checkout code** - Gets the latest code
- **Setup Node.js** - Installs Node.js 20 with npm caching
- **Install dependencies** - Runs `npm ci` for clean install
- **Lint OpenAPI spec** - Runs `npm test` (executes `redocly lint`)
- **Bundle OpenAPI spec** - Runs `npm run build` (executes `redocly bundle`)
- **Upload bundled spec** - Saves the bundled spec as an artifact (30-day retention)

#### 2. Deploy Documentation (runs only on main branch pushes)
- **Build documentation** - Creates the documentation bundle
- **Deploy to GitHub Pages** - Publishes the documentation to GitHub Pages

### Branch Protection

The validation job ensures that:
- ✅ OpenAPI spec is valid
- ✅ No linting errors
- ✅ Spec can be bundled successfully

### GitHub Pages Setup

To enable GitHub Pages deployment:

1. Go to repository **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Save the settings

After the first successful deployment to `main`, your documentation will be available at:
```
https://<organization>.github.io/<repository>/
```

For this repository:
```
https://greenbuttonalliance.github.io/openapi-starter/
```

### Local Development

Run the same checks locally before pushing:

```bash
# Validate and lint
npm test

# Build bundle
npm run build

# Preview documentation
npm start
```

### Artifacts

Each workflow run produces:
- **openapi-bundle** - The bundled OpenAPI spec (available for 30 days)
- **github-pages** - The deployed documentation (on main branch only)

### Status Badge

Add this badge to your README to show the build status:

```markdown
![OpenAPI CI/CD](https://github.com/GreenButtonAlliance/openapi-starter/workflows/OpenAPI%20CI%2FCD/badge.svg)
```
