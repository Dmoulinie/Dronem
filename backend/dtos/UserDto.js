export class UserDto {
    constructor({ id, firstname, lastname, password, username, email }) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.password = password;
        this.username = username;
        this.email = email;
    }
}
