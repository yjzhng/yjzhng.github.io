# yjzhng.github.io

My personal homepage — a small, self-contained Jekyll site (no theme gem, no
plugins). Navbar + left sidebar + content, with an auto/light/dark toggle and
instant tab switching. GitHub Pages builds and publishes it on push to `main`.

## Structure

| Path | Purpose |
| --- | --- |
| `index.md` | **HOME** tab (`/`) — bio |
| `projects.html` | **PROJECTS** tab (`/projects/`) — tiles from `_data/projects.yml` |
| `activity.html` | **ACTIVITY** tab (`/activity/`) — social feed embed |
| `_data/projects.yml` | the project tiles (one entry each) |
| `_data/navigation.yml` | the three top-bar tabs |
| `_config.yml` | site title + `author:` sidebar info |
| `_layouts/default.html` | the page shell |
| `_includes/` | `head`, `masthead` (navbar), `sidebar`, `footer` |
| `assets/css/style.css` | all styling (light/dark via `prefers-color-scheme`) |
| `assets/js/site.js` | theme toggle + instant tab-switching |

## Editing

- **Bio** — `index.md`; **sidebar** name/links — `author:` in `_config.yml`.
- **Add a project** — add an entry to `_data/projects.yml`.
- **Tabs** — `_data/navigation.yml`.

## Local preview (optional)

The repo carries no build tooling. To preview locally, install Jekyll
(`gem install jekyll`) and run `jekyll serve`.
