const admin = require('firebase-admin');
const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

if (!serviceAccountPath) {
  throw new Error('GOOGLE_APPLICATION_CREDENTIALS environment variable is not set');
}

const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
// Success message
console.log(`[INFO] Connected to Firebase Admin`);
module.exports = admin; // Export the admin instance to be used in other files
