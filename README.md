# Shanmukha Badiger – Portfolio

A plain HTML, CSS and JavaScript site. No build step, no installs.

```
shanmukha-portfolio/
├── index.html          page structure (bar-chart hero, card wheel, sections, contact)
├── css/style.css       all styling and animations
├── js/main.js          card wheel, project view, dock, report, and YOUR CONTENT
├── images/             portraits, hero slices, and photos/ for the photography reel
└── assets/             Shanmukha_Badiger_Resume.pdf
```

## Run it in VS Code

1. Unzip the folder and open it in VS Code (File → Open Folder).
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click `index.html` → **Open with Live Server**. The site opens in your browser and reloads every time you save.

Double-clicking `index.html` also works, but Live Server is better for editing.

## What to edit, and where

| You want to change | File | Look for |
|---|---|---|
| LinkedIn / GitHub links | `js/main.js` | `var LINKS` at the top |
| Projects (title, text, tags, sections) | `js/main.js` | `var P=[` |
| Bar-chart hero (skills and bar heights) | `js/main.js` | `var BARS=[` |
| Hero photo slices | `images/` | `hero-bw.jpg`, `hero-color.jpg` |
| Toolkit (in About) | `js/main.js` | `var SK=[` |
| Experience and education timeline | `js/main.js` | `var jobs=[` |
| About text, facts, contact | `index.html` | `id="about"`, `id="contact"` |
| Photography reel (photos, captions, categories) | `js/main.js` + `images/photos/` | `var PHOTOS=[` |
| Featured photo series (Sannati) | `js/main.js` | `var SERIES=` |
| Actual vs Budget page (hotspots, insights, build steps, DAX, GitHub link) | `js/avb.js` | `var HS=[`, `var STEPS=[` |
| Dashboard screenshot | `images/pbi/` | `dashboard.webp` (page) and `dashboard-full.png` (full size) |
| Research papers (summaries, findings, Then/Now cards) | `js/research.js` | `var PAPERS=[` |
| Value at Risk page (charts, tables, findings, steps) | `js/varp.js` | top of file; set `REPO` to the GitHub link |
| VaR charts and downloads | `images/var/`, `assets/var/` | replace files, keep names |
| Newsletter and video links | `js/main.js` | `LINKS.newsletter` (list of BIRLITES issues), `LINKS.film` |
| Film and newsletter cards | `index.html` | `class="cr-grid"` |
| Technical analysis page | `js/tap.js` | top of file; set `REPO` to the GitHub link |
| Colours and fonts | `css/style.css` | `:root` at the top (`--red`, `--ink`, `--paper`…) |
| Photos | `images/` | replace the files, keep the same names |
| Resume | `assets/` | replace the PDF, keep the name or update `LINKS.resume` |

### Adding a new project

Copy one `{k:'...', ...}` block inside `var P=[ ... ]`, give it a new `k` (e.g. `'budget'`), and edit the text. It appears automatically in the **Selected work** grid and in the bottom dock. To give it a specific grid size, add it to the `span` list in `main.js` (`span4`, `span3` or `span2`); otherwise set `span2`.

To also show it on the hero wheel, add a card to `var W=[` with `k:'budget'`.

### Showing your real Power BI report

1. In Power BI Service: open the report → **File → Embed report → Publish to web (public)** → copy the link.
   (Only use Publish to web for data that is OK to be public.)
2. In `js/main.js`, find the `pbi` project and paste the link into `embed:''`.

The sample report disappears and your live report shows in its place.

## Put it online for free

**Netlify (easiest):** go to app.netlify.com/drop and drag the whole `shanmukha-portfolio` folder onto the page. You get a link in seconds.

**GitHub Pages:** create a repository, upload all files (keep the folders), then Settings → Pages → Branch: `main` → Save. Your site will be at `https://your-username.github.io/repo-name/`.

## Notes

- Fonts load from Google Fonts, so they need internet. Without it, the site falls back to system fonts.
- Animations are reduced automatically for visitors who turn on "reduce motion" in their system settings.
- Each project has a shareable link, such as `yoursite.com/#p-pbi`.

### Actual vs Budget dashboard

The project page shows your real dashboard screenshot (`images/pbi/`) with numbered hotspots, the key insights, a six-step build guide and the DAX patterns. It links to your GitHub repository. To swap in a new screenshot, replace both image files and keep the names. The old interactive replica is in `extras/avb-interactive-replica.js`.

## Removed in the clean-up (kept, not lost)

`extras/removed-sections.html` holds the card wheel, the skills band, the old Skills and Education sections and the old About block. `extras/removed-projects.js` holds the projects that were taken out of Work. Paste any of them back to restore it. Extra photos are in `PHOTOS_MORE` in `js/main.js`.
