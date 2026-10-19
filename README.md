# Ordly

Ordly's frontend, built with [Angular](https://angular.dev) (standalone components, CSS, routing).

> This repository currently contains the base Angular project only. UI work (components, pages, layout, routes) and backend/API integration are out of scope for now.

## Requirements

- [Node.js](https://nodejs.org) `^20.19` || `^22.12` || `>=24`
- npm (ships with Node.js)

## Install

```bash
npm install
```

## Run (development)

```bash
npm start
```

This starts the Angular dev server. Open http://localhost:4200/ in your browser. The app reloads automatically when you change source files.

## Build (production)

```bash
npm run build
```

The build artifacts are written to `dist/`.

## Test

```bash
npm test
```

## Project structure

```
src/
  app/
    components/   # reusable UI components (empty for now)
    pages/        # route-level page components (empty for now)
    app.ts        # root component
    app.routes.ts # application routes
    app.config.ts # application providers
  main.ts         # bootstrap entry point
  index.html
  styles.css
public/           # static assets
```
