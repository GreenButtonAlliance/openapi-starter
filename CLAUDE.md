# Claude Instructions for openapi-starter

## Branch Management

**IMPORTANT:** Always create a new branch before making any changes to the codebase.

### Branch Naming Convention
- Feature branches: `feature/<description>`
- Bug fixes: `fix/<description>`
- Documentation: `docs/<description>`
- CI/CD changes: `ci/<description>`

### Workflow
1. **Before making changes:** Create a new branch from main
   ```bash
   git checkout main
   git pull
   git checkout -b <branch-type>/<description>
   ```

2. **After changes:** Commit and push to the feature branch
   ```bash
   git add <files>
   git commit -m "type: description"
   git push -u origin <branch-name>
   ```

3. **Create PR:** Use `gh pr create` with descriptive title and body

4. **After merge:** Delete the feature branch
   ```bash
   git checkout main
   git pull
   git branch -d <branch-name>
   ```

## OpenAPI Development

### File Organization
- Main spec: `openapi/openapi.yaml`
- Schemas: `openapi/components/schemas/`
- Paths: `openapi/paths/`
- Parameters: `openapi/components/parameters/`
- Responses: `openapi/components/responses/`

### Testing Changes
Always run these commands before committing:
```bash
npm test          # Lint the OpenAPI spec
npm run build     # Build HTML documentation
npm start         # Preview docs locally
```

### Examples
- Use resource-specific examples inline in path files
- Base examples on real ESPI sample data when available
- Use `data.greenbuttonconnect.org` as the host for all example URLs
- Follow ESPI/Atom XML formatting conventions from ~/.claude/CLAUDE.md

## Commit Message Format

Follow conventional commits:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `ci:` CI/CD changes
- `chore:` Maintenance tasks

Always include:
```
Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

## Deployment

- CI/CD automatically runs on all PRs and pushes to main
- GitHub Pages deploys automatically on main branch pushes
- Documentation URL: https://greenbuttonalliance.github.io/openapi-starter/
