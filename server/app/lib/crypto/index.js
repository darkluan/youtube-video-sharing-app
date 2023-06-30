const crypto = require("crypto");

// Function to create a password hash
function createPasswordHash(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha256")
    .toString("hex");
  return { salt, hash };
}

// Function to verify a password against a stored hash
function verifyPassword(password, passwordHash, salt) {
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha256")
    .toString("hex");
  return hash === passwordHash;
}

module.exports = { createPasswordHash, verifyPassword };
