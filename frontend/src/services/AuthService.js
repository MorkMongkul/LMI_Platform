import { AuthModel } from '../models/AuthModel';

export class AuthService {
        constructor() {
                this.authModel = new AuthModel();
        }

        async login(email, password, rememberMe = false) {
                try {
                        return await this.authModel.login(email, password, rememberMe);
                } catch (error) {
                        console.error('Login error:', error);
                        return {
                                success: false,
                                user: null,
                                message: 'An error occurred during login'
                        };
                }
        }

        async signup(name, email, password, agreeTerms) {
                try {
                        return await this.authModel.signup(name, email, password, agreeTerms);
                } catch (error) {
                        console.error('Signup error:', error);
                        return {
                                success: false,
                                user: null,
                                message: 'An error occurred during signup'
                        };
                }
        }

        logout() {
                try {
                        return this.authModel.logout();
                } catch (error) {
                        console.error('Logout error:', error);
                        return {
                                success: false,
                                message: 'An error occurred during logout'
                        };
                }
        }

        isAuthenticated() {
                return this.authModel.isAuthenticated();
        }

        getCurrentUser() {
                return this.authModel.getCurrentUser();
        }
}