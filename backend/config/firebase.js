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

async function setupAdminRoles() {
  try {
      const uid = 'jdZqwvR4dzSRVgK3UI0GzunTnOB3'; // Replace with actual UID
      await admin.auth().setCustomUserClaims(uid, { admin: true });
      console.log(`Admin role assigned to user ${uid}`);
  } catch (error) {
      console.error('Error setting custom claims:', error.message);
  }
}

// Run the setup only once
// setupAdminRoles();

module.exports = admin; // Export the admin instance to be used in other files
