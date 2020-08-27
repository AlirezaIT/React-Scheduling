const User = require('../models/user');
const db = require('../db/index');
const bcrypt = require('bcrypt');

exports.getUser = async (username) => {
    const sql = `SELECT * FROM users where username = ?`;
    try {
        let userFound = await db.query(sql, [username]);
        userFound = userFound.rows[0];
        if (!userFound) {
            // throw new Error(`not found any user with this username`)
            return null;
        }
        return new User(userFound.id, userFound.username, userFound.password ,userFound.role);
    } catch (error) {
        throw error;   
    }
}

exports.checkPassword = async function(enterPassword, hashPassword) {
    return bcrypt.compare(enterPassword, hashPassword);
}

exports.getUserById = async function (id) {
    const sql = `SELECT * FROM users where id = ?`;
    try {
        let userFound = await db.query(sql, [id]);
        userFound = userFound.rows[0];
        if (!userFound) {
            // throw new Error(`not found any user with this username`)
            return null;
        }
        return new User(userFound.id, userFound.username, userFound.password ,userFound.role);
    } catch (error) {
        throw error;   
    }
}