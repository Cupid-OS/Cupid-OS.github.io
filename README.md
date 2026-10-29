# CupidEXE — Cupid-OS.github.io

The personal homepage and project hub for **CupidEXE**, built and maintained by Thiago.

Live site: **https://cupid-os.github.io** (also reachable via the custom domain configured in `CNAME`).

## What this site is

A Y2K/retro-future styled control deck that serves as Thiago's central hub. It includes:

- **Server Panel Access** — direct link to the [game server panel](https://panel.cupidexe.me/) used to manage the Minecraft and other game servers run for friends.
- **HTML Exercises Portal** — a collection of practice/homework exercises hosted at `html-exercises/`.
- **Study PDFs** — downloadable networking study material (FLSM/VLSM subnetting practice, network notes, routing guides) in `assets/studies/`.
- **Multilingual interface** — the homepage switches between **English (UK), Spanish, and Portuguese** via a language selector.

Everything is plain front-end tech — HTML, CSS, and vanilla JavaScript — hosted for free with GitHub Pages.

## Repository structure

| Path | Purpose |
| --- | --- |
| `index.html` | Main homepage (hero, about card, study PDFs, language switcher) |
| `styles.css` | Global stylesheet / Y2K theming |
| `script.js` | Language switching and page behaviour |
| `assets/` | Logo, study PDFs, and other static assets |
| `html-exercises/` | The HTML exercises portal |
| `football-game/` | Football game project |
| `CNAME` | Custom domain configuration for GitHub Pages |
| `sitemap.xml` | Sitemap for search engines |

## Local development

No build step required. Clone and open `index.html` directly, or serve statically:

```bash
git clone https://github.com/Cupid-OS/Cupid-OS.github.io.git
cd Cupid-OS.github.io
# open index.html in a browser, or:
python -m http.server 8000
```

## Deployment

Automatic — anything pushed to `main` is deployed by GitHub Pages.
