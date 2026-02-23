// Test setup file
const fs = require('fs');
const path = require('path');

// Clean up test database before each test suite
beforeEach(() => {
  const testDbPath = path.join(__dirname, '..', `test-database-${process.pid}.sqlite`);
  if (fs.existsSync(testDbPath)) {
    fs.unlinkSync(testDbPath);
  }
});

// Clean up test database after all tests
afterAll(() => {
  const testDbPath = path.join(__dirname, '..', `test-database-${process.pid}.sqlite`);
  if (fs.existsSync(testDbPath)) {
    fs.unlinkSync(testDbPath);
  }
});
