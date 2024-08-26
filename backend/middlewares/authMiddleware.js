const admin = require('../config/firebase'); // Import the Firebase admin instance

const authenticateToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).send('Access Denied');

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(403).send('Invalid Token');
  }
};

module.exports = { authenticateToken };