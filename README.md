# avroshk.github.io

Portfolio Website

https://avroshk.com

## Eclipse sonification

- `/eclipse/` is the React app hosted by the separate [eclipse](https://github.com/avroshk/eclipse) repository’s GitHub Pages site. Its build and media are not copied into this repository.
- Legacy AngularJS hash links such as `/#eclipse/hopkinsville/info` open the corresponding recording in the current app.
- `/eclipse-archive/` and its city routes preserve the original AngularJS website. Its templates, scripts, and media remain in this repository.

To update the current app, build its source repository and publish `dist/` to that repository’s `gh-pages` branch. This portfolio repository only preserves the original app and its archive routes.

GitHub Pages builds this repository with Jekyll from `master`. The root `index.html` redirect list and `_layouts/redirect.html` support the AngularJS routes; keep them enabled. Do not add a root `.nojekyll` file.
