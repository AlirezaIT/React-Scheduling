class User {    
    constructor(id, username, password, role) {
        if(id) {
            this.id = id;
        }
        this.username = username;
        this.password = password;
        this.role = role;
    }
}
module.exports = User;
