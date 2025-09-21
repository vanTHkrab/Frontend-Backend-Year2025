const jwt = require('jsonwebtoken');
const config = require('../config');

class AuthService {
    constructor() {
        // Simple hardcoded user for testing
        this.testUser = {
            username: 'test',
            password: 'test',
            id: 'test-user-id'
        };
    }

    async login(username, password) {
        try {
            // Check credentials against hardcoded test user
            if (username === this.testUser.username && password === this.testUser.password) {
                // Generate JWT token
                const token = jwt.sign(
                    {
                        sub: this.testUser.id,
                        username: this.testUser.username,
                        type: 'access'
                    },
                    config.jwt.accessSecret,
                    {
                        expiresIn: '1h'
                    }
                );

                return {
                    success: true,
                    token: token,
                    user: {
                        id: this.testUser.id,
                        username: this.testUser.username
                    }
                };
            }

            return {
                success: false,
                message: 'Invalid credentials'
            };
        } catch (error) {
            console.error('Login error:', error);
            return {
                success: false,
                message: 'Login failed'
            };
        }
    }

    async verifyToken(token) {
        try {
            const decoded = jwt.verify(token, config.jwt.accessSecret);
            return {
                success: true,
                user: decoded
            };
        } catch (error) {
            return {
                success: false,
                message: 'Invalid token'
            };
        }
    }
}

module.exports = AuthService;
