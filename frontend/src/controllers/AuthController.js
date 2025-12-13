// Simplified AuthController for development
export class AuthController {
        static async login(email, password, rememberMe = false) {
                // Simple validation
                if (!email || !password) {
                        return {
                                success: false,
                                user: null,
                                message: 'Email and password are required'
                        };
                }

                if (!this.validateEmail(email)) {
                        return {
                                success: false,
                                user: null,
                                message: 'Please enter a valid email address'
                        };
                }

                // Demo login - always succeeds for development
                return {
                        success: true,
                        user: {
                                id: 'demo-user-123',
                                name: email.split('@')[0],
                                email: email,
                                role: 'user'
                        },
                        message: 'Login successful (Demo Mode)'
                };
        }

        static async signup(name, email, password, agreeTerms) {
                // Simple validation
                if (!name || !email || !password) {
                        return {
                                success: false,
                                user: null,
                                message: 'All fields are required'
                        };
                }

                if (!this.validateEmail(email)) {
                        return {
                                success: false,
                                user: null,
                                message: 'Please enter a valid email address'
                        };
                }

                if (password.length < 6) {
                        return {
                                success: false,
                                user: null,
                                message: 'Password must be at least 6 characters long'
                        };
                }

                if (!agreeTerms) {
                        return {
                                success: false,
                                user: null,
                                message: 'You must agree to the terms and conditions'
                        };
                }

                // Demo signup - always succeeds for development
                return {
                        success: true,
                        user: {
                                id: 'demo-user-' + Date.now(),
                                name: name,
                                email: email,
                                role: 'user',
                                createdAt: new Date()
                        },
                        message: 'Account created successfully (Demo Mode)'
                };
        }

        static logout() {
                // Demo logout
                return {
                        success: true,
                        message: 'Logged out successfully'
                };
        }

        static validateEmail(email) {
                const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return re.test(email);
        }
}