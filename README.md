# Personal Portfolio — Harsh Takalkar

Source for [harsh58.onrender.com](https://harsh58.onrender.com/) — a single-page
portfolio site built with plain HTML, CSS, and JavaScript (no framework, no
build step).

## Sections

- **Hero** — intro, role, quick facts
- **About** — bio and core tech stack
- **Skills** — frontend/backend/database/problem-solving proficiency
- **Projects** — Study Sphere (MERN notes-sharing platform) and a
  remote-controlled Military Surveillance Vehicle project
- **Experience** — education timeline
- **Contact** — direct contact info + message form

## Tech

- Semantic HTML5
- CSS3 (custom properties, no framework)
- Vanilla JavaScript — mobile nav toggle, scroll-spy active nav state
- Fonts: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk),
  [Inter](https://fonts.google.com/specimen/Inter),
  [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)

## Project Structure

```
index.html
assets/
├── css/style.css
├── js/script.js
└── images/
```

## Running locally

No build step required — it's static HTML/CSS/JS.

```bash
git clone https://github.com/harshtakalkar037-boop/personal-web.git
cd personal-web
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deployment

Deployed on [Render](https://render.com/) as a static site, auto-deploying
from the `main` branch.

## License

MIT — see [LICENSE](./LICENSE).
