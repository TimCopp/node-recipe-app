const sqlite3 = require('sqlite3')
const { open } = require('sqlite')

async function getTestDbConnection() {
	const filename = `./test-database-${process.pid}.sqlite`
	return open({
		filename,
		driver: sqlite3.Database,
	})
}

async function initializeTestDb() {
	const db = await getTestDbConnection()
	await createTables(db)
	return db
}

async function createTables(db) {
	// Create the 'recipes' table to store recipe information
	await db.exec(`CREATE TABLE IF NOT EXISTS recipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    ingredients TEXT,
    method TEXT
  )`)
}

module.exports = { getTestDbConnection, initializeTestDb }
