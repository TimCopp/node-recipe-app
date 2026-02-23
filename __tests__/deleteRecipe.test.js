const request = require('supertest')
const express = require('express')
const routes = require('../src/routes')
const { initializeTestDb } = require('./test-database')

// Mock the database module to use test database
jest.mock('../src/database', () => ({
  getDbConnection: () => require('./test-database').getTestDbConnection()
}))

// Simple app setup for testing
function createTestApp() {
  const app = express()
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  // Simple mock for res.render
  app.use((req, res, next) => {
    res.render = (view, locals) => res.json({ view, locals })
    next()
  })

  app.use('/', routes)
  return app
}

describe('POST /recipes/:id/delete', () => {
  let app
  let db

  beforeEach(async () => {
    app = createTestApp()
    db = await initializeTestDb()
    // ensure clean state and insert a recipe to delete
    await db.run('DELETE FROM recipes')
    await db.run('INSERT INTO recipes (title, ingredients, method) VALUES (?, ?, ?)', [
      'To Be Deleted',
      'eggs, flour',
      'Mix and bake',
    ])
  })

  afterEach(async () => {
    if (db) {
      await db.close()
    }
  })

  test('deletes the recipe and redirects to /recipes', async () => {
    const recipe = await db.get('SELECT * FROM recipes WHERE title = ?', ['To Be Deleted'])

    const res = await request(app).post(`/recipes/${recipe.id}/delete`)
    expect(res.status).toBe(302)
    expect(res.headers.location).toBe('/recipes')

    const after = await db.get('SELECT * FROM recipes WHERE id = ?', [recipe.id])
    expect(after).toBeUndefined()
  })
})
