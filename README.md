# andychan.net

Personal portfolio for Andy Chan — full-stack developer and data specialist
at the University of Houston. Plain HTML, CSS, and a little JavaScript. No
build step.

## Serving locally

Any static file server works. From the repo root:

```sh
python3 -m http.server 8080
```

Then open <http://localhost:8080>.

## Structure

- `index.html` — homepage (work, about, contact)
- `css/portfolio.css` — current stylesheet
- `css/styles.css` — legacy Bootstrap theme, kept for reference, unused
- `js/scripts.js` — minimal progressive enhancement (scroll reveals)
- `assets/` — images and favicon
- `bible/` — legacy static pages, unrelated to the portfolio
- `git.notes.md`, `node.js.md` — personal notes
