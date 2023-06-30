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

//   // Example usage
//   const password = 'myPassword';
//   const storedHash = 'd7a304c3c81c27f1e1e33c6a3ea0a134773a5a9a1e27b0e165e6d4a729d9b3de';
//   const storedSalt = '8a78e563e2519f2e2fcf78882b79c49a';
//   const isPasswordValid = verifyPassword(password, storedHash, storedSalt);
//   console.log(isPasswordValid);

// // Example usage
// const password = 'myPassword';
// const passwordHash = createPasswordHash(password);
// console.log(passwordHash);

module.exports = { createPasswordHash, verifyPassword };
