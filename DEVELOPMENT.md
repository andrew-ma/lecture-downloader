# Development

## Install from Source Code
Change into folder with package.json, then
```
npm install
```

## Build extension
Code from _`source`_ directory will be built to _`distribution`_ directory
```
npm run clean
npm run build
```

_`distribution`_ directory can be zipped, and uploaded as browser extension


## Run Lint checks
Linting single CSS file
```
npx stylelint source/panopto-download-button.css
```

Automatically fixing single CSS file
```
npx stylelint source/panopto-download-button.css --fix
```

Linting JS files
```
npx xo
```

Automatically fixing JS files
```
npx xo --fix
```

Specific lint checks can be disabled by setting options for "xo":  and "stylelint": in _`package.json`_