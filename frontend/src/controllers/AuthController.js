// Simple AuthController for CLMI Platform
class AuthController {
  static currentUser = null;

  static async login(email, password, rememberMe = false) {
    // Simple validation
    if (!email || !password) {
      return {
        success: false,
        user: null,
        message: 'Email and password are required'
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        user: null,
        message: 'Please enter a valid email address'
      };
    }

    // Demo login - always succeeds for development
    const user = {
      id: 'demo-user-' + Date.now(),
      name: email.split('@')[0],
      email: email,
      role: 'user',
      token: 'demo-token-' + Date.now()
    };

    // Store user in memory and localStorage
    this.currentUser = user;
    localStorage.setItem('clmi_user', JSON.stringify(user));
    localStorage.setItem('clmi_authenticated', 'true');

    if (rememberMe) {
      localStorage.setItem('clmi_remember_me', 'true');
    }

    return {
      success: true,
      user: user,
      message: 'Login successful'
    };
  }

  static async signup(name, email, userType, password, agreeTerms) {
    // Simple validation
    if (!name || !email || !userType || !password) {
      return {
        success: false,
        user: null,
        message: 'All fields are required'
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
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
    const user = {
      id: 'demo-user-' + Date.now(),
      name: name,
      email: email,
      role: userType,
      token: 'demo-token-' + Date.now()
    };

    // Store user in memory and localStorage
    this.currentUser = user;
    localStorage.setItem('clmi_user', JSON.stringify(user));
    localStorage.setItem('clmi_authenticated', 'true');

    return {
      success: true,
      user: user,
      message: 'Account created successfully'
    };
  }

  static logout() {
    this.currentUser = null;
    localStorage.removeItem('clmi_user');
    localStorage.removeItem('clmi_authenticated');
    localStorage.removeItem('clmi_remember_me');
    return {
      success: true,
      message: 'Logged out successfully'
    };
  }

  static isAuthenticated() {
    // Check localStorage for authentication flag
    const isAuth = localStorage.getItem('clmi_authenticated') === 'true';

    // Also check if user data exists
    if (isAuth) {
      const userJson = localStorage.getItem('clmi_user');
      if (userJson) {
        try {
          this.currentUser = JSON.parse(userJson);
          return true;
        } catch (error) {
          console.error('Error parsing user data:', error);
          return false;
        }
      }
    }

    // Check memory
    return !!this.currentUser;
  }

  static getCurrentUser() {
    if (!this.currentUser) {
      const userJson = localStorage.getItem('clmi_user');
      if (userJson) {
        try {
          this.currentUser = JSON.parse(userJson);
        } catch (error) {
          console.error('Error parsing user data:', error);
          return null;
        }
      }
    }
    return this.currentUser;
  }

  // Helper method to validate email
  static validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}

// Export as both default and named export
export { AuthController };
export default AuthController;