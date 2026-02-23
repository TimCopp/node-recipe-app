# Recipe App — Documentation

## Overview

Small demo Node.js application showing CRUD operations for recipes using Express, Handlebars, and SQLite. Intended for learning and workshop use.

## Quick start

Install dependencies:

```bash
npm install
```

Run in development (restarts on changes):

```bash
npm run dev
```

Run production server:

```bash
npm start
```

Run tests:

```bash
npm test
```

Visit http://localhost:3000 in your browser.

## NPM scripts

- **test:** runs the Jest test suite.
- **test:watch:** runs Jest in watch mode.
- **dev:** runs `nodemon index.js` for development.
- **start:** runs `node index.js`.

## Project layout

- `index.js` — app entry and Express setup.
- `src/routes.js` — application routes and handlers.
- `src/database/connection.js` — opens SQLite connection.
- `src/database/schema.js` — creates DB tables.
- `src/database/seedData.js` — inserts sample recipes when DB is empty.
- `views/` — Handlebars templates (`home.hbs`, `recipes.hbs`, `recipe.hbs`, `layouts/main.hbs`).
- `public/` — static assets (e.g., `style.css`).
- `__tests__/` — Jest tests and helpers.

## Routes

- `GET /` — renders the home page.
- `GET /recipes` — lists all recipes.
- `GET /recipes/:id` — shows a single recipe by id.
- `POST /recipes` — creates a new recipe (expects `title`, `ingredients`, `method` in `req.body`).
- `POST /recipes/:id/edit` — updates an existing recipe (expects `title`, `ingredients`, `method`).

The route handlers are implemented in `src/routes.js`.

## Database schema

The app creates a `recipes` table with the following columns (see `src/database/schema.js`):

- `id` INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL
- `title` TEXT NOT NULL
- `description` TEXT
- `ingredients` TEXT
- `method` TEXT

Seed data is inserted by `src/database/seedData.js` on first run (e.g., Spaghetti Carbonara, Chocolate Chip Cookies, Caesar Salad).

## Views

Templates live in `views/` and use Handlebars. Main templates:

- `home.hbs` — landing page
- `recipes.hbs` — recipe listing
- `recipe.hbs` — single recipe view

## Testing

Run the test suite with `npm test`. Tests are under `__tests__/` and use Jest and Supertest.

## Development notes

- To add a new endpoint, edit `src/routes.js` and add corresponding view/template in `views/`.
- To change the DB schema, update `src/database/schema.js` and ensure migration of existing data as needed.
- The app uses SQLite; the file-backed DB is created/opened by `src/database/connection.js`.

## Ideas for extension

- Add a `DELETE /recipes/:id` endpoint and UI for deleting recipes.
- Add a `/recipes/random` endpoint to return a random recipe.
- Add search and filtering by ingredient or title.

---

For the quick reference, see the main entrypoint at [index.js](index.js) and the routes at [src/routes.js](src/routes.js).
