const authService = require('./auth.service');

class AuthController {
    constructor() {
        this.service = new authService();
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({ 
                    error: 'Username and password are required' 
                });
            }

            const result = await this.service.login(username, password);

            if (!result.success) {
                return res.status(401).json({ 
                    error: 'Invalid credentials' 
                });
            }

            res.json({
                message: 'Login successful',
                token: result.token,
                tokenType: 'Bearer'
            });
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ 
                error: 'Internal server error' 
            });
        }
    }

    async verify(req, res) {
        try {
            // If we reach here, the token was valid (middleware passed)
            res.json({
                message: 'Token is valid',
                userId: req.userId
            });
        } catch (error) {
            console.error('Error during token verification:', error);
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    }

    async logout(req, res) {
        try {
            // For JWT tokens, logout is typically handled client-side by removing the token
            // But we can provide a logout endpoint for consistency and logging
            res.json({
                message: 'Logout successful',
                instructions: 'Please remove the token from client storage'
            });
        } catch (error) {
            console.error('Error during logout:', error);
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    }
}

module.exports = AuthController;
