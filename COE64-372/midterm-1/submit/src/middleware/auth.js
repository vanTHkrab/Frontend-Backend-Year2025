const jwt = require('jsonwebtoken');
const config = require('../config');
function requireAuth(req, res, next) {
    const hdr = req.headers['authorization'] || '';
    const [scheme, token] = hdr.split(' ');
    if (scheme !== 'Bearer' || !token) {
        return res.status(401).json({ error: 'Missing or invalid Authorization header' });
    }
    try {
        const payload = jwt.verify(token, config.jwt.accessSecret);
        if (payload.type !== 'access') {
            return res.status(401).json({ error: 'Invalid token type' });
        }
        req.userId = payload.sub;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Unauthorized', details: err.message });
    }
}
module.exports = { requireAuth };