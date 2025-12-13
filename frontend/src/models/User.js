export class User {
        constructor(name, email, role = 'user') {
                this.id = Date.now().toString();
                this.name = name;
                this.email = email;
                this.role = role;
                this.createdAt = new Date();
                this.updatedAt = new Date();
        }

        update(updates) {
                Object.assign(this, updates);
                this.updatedAt = new Date();
                return this;
        }

        toJSON() {
                return {
                        id: this.id,
                        name: this.name,
                        email: this.email,
                        role: this.role,
                        createdAt: this.createdAt,
                        updatedAt: this.updatedAt
                };
        }
}