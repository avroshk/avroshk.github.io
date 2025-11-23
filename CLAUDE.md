# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website (avroshk.com) built as a static GitHub Pages site. The site showcases projects related to research in music, digital signal processing (DSP), and WebAudio.

## Tech Stack

- **Frontend Framework**: AngularJS 1.5.x (legacy)
- **UI Framework**: Bootstrap 3.3.x
- **Audio Libraries**: WaveSurfer.js, Howler.js
- **Build Tool**: Grunt
- **Hosting**: GitHub Pages with Jekyll (for redirects)

## Development Commands

### Local Development Server
```bash
npm install              # Install dependencies
grunt serve              # Start dev server on port 8001
# Alternative:
grunt                    # Default task also runs the server
```

The server runs on port 8001 with hostname '*' and auto-opens in browser.

## Architecture

### Routing & Structure

The application uses AngularJS routing with HTML5 mode enabled. All routes are defined in `scripts/app.js` and map to HTML templates in the `templates/` directory.

**Key routes:**
- `/` - Portfolio landing page
- `/diarization` - Speaker diarization project
- `/eclipse/*` - Eclipse observation projects (Hopkinsville, Atlanta)
- `/mixinginvr` - VR mixing project
- `/birdsong-segmentation` - Birdsong analysis project
- `/info` - About page
- `/credits` - Credits page

Jekyll redirects are configured in the frontmatter of `index.html` to handle legacy URLs.

### File Organization

```
/
├── index.html              # Main entry point (AngularJS app root)
├── scripts/
│   ├── app.js             # Main app module, routing, controllers
│   └── external/          # Third-party scripts (sine-waves, dtm, etc.)
├── templates/             # HTML templates for each route
├── css/                   # Custom styles
├── media/                 # Images, logos, assets
├── fonts/                 # Custom fonts (Roboto, IcoMoon icons)
└── extras/                # Additional resources

```

### Mobile Detection

The app includes mobile detection logic (`_isNotMobile` variable) in `scripts/app.js` that checks the user agent. This affects how certain features are rendered (particularly audio/visual components).

### Jekyll Configuration

GitHub Pages uses Jekyll for serving the site. Configuration in `_config.yml`:
- Uses `jekyll-redirect-from` plugin for URL redirects
- Excludes `README.md` from build

## Important Notes

- This is a **legacy AngularJS 1.x** application (not Angular 2+)
- Uses Angular's `ngRoute` module for client-side routing
- Most external dependencies loaded via CDN in `index.html`
- Audio files (*.wav, *.aif, *.mp3) are gitignored
- The site uses HTML5 mode routing (no hash URLs)
