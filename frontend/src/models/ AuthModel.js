export class AuthModel {
        constructor() {
                this.users = this.loadUsers();
                this.currentUser = this.loadCurrentUser();
        }

        loadUsers() {
                const usersJson = localStorage.getItem('clmi_users');
                return usersJson ? JSON.parse(usersJson) : [];
        }

        loadCurrentUser() {
                const userJson = localStorage.getItem('clmi_current_user');
                return userJson ? JSON.parse(userJson) : null;
        }

        saveUsers() {
                localStorage.setItem('clmi_users', JSON.stringify(this.users));
        }

        saveCurrentUser(user) {
                if (user) {
                        localStorage.setItem('clmi_current_user', JSON.stringify(user));
                } else {
                        localStorage.removeItem('clmi_current_user');
                }
                this.currentUser = user;
        }

        async login(email, password, rememberMe = false) {
                // In a real app, this would be an API call
                const user = this.users.find(u => u.email === email && u.password === password);

                if (user) {
                        const { password: _, ...userWithoutPassword } = user;
                        this.saveCurrentUser(userWithoutPassword);

                        if (rememberMe) {
                                localStorage.setItem('clmi_remember_me', 'true');
                        }

                        return {
                                success: true,
                                user: userWithoutPassword,
                                message: 'Login successful'
                        };
                }

                return {
                        success: false,
                        user: null,
                        message: 'Invalid email or password'
                };
        }

        async signup(name, email, password, agreeTerms) {
                if (!agreeTerms) {
                        return {
                                success: false,
                                user: null,
                                message: 'You must agree to the terms and conditions'
                        };
                }

                const existingUser = this.users.find(u => u.email === email);
                if (existingUser) {
                        return {
                                success: false,
                                user: null,
                                message: 'User with this email already exists'
                        };
                }

                const newUser = {
                        id: Date.now().toString(),
                        name,
                        email,
                        password, // In real app, this should be hashed
                        role: 'user',
                        createdAt: new Date(),
                        updatedAt: new Date()
                };

                this.users.push(newUser);
                this.saveUsers();

                const { password: _, ...userWithoutPassword } = newUser;
                return {
                        success: true,
                        user: userWithoutPassword,
                        message: 'Account created successfully'
                };
        }

        logout() {
                this.saveCurrentUser(null);
                if (!localStorage.getItem('clmi_remember_me')) {
                        localStorage.removeItem('clmi_current_user');
                }
                return {
                        success: true,
                        message: 'Logged out successfully'
                };
        }

        isAuthenticated() {
                return !!this.currentUser;
        }

        getCurrentUser() {
                return this.currentUser;
        }
}