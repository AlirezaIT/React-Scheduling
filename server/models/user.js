class User {
  constructor(id, username, password, role, name) {
    if (id) {
      this.id = id;
    }
    this.username = username;
    this.password = password;
    this.role = role;
    this.name = name;
  }
}
module.exports = User;
