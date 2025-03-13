// const connection = require("../config/database");
import connection from "../config/database.js";
const getAllUser = async() => {
    let [results, fields] = await connection.execute('select * from Users');
    return results;
}

const getUserByID = async(userID) => {
    let [results, fields] = await connection.execute('select * from Users where id = ?', [userID]);
    let user = results && results.length > 0 ? results[0]: {};
    return user;
}

const CreateNewUser = async(email, name, city) => {
    const [results, fields] = await connection.execute (
        `INSERT INTO Users (email, name, city) VALUES (?, ?, ?);`,[email, name, city],
    );
}

const UpdateUserByID = async (email, name, city, userID) => {
    let [results, fields] = await connection.execute (
        ` UPDATE Users 
            SET email  = ?, name = ?, city = ?
            WHERE id = ?`,[email, name, city, userID]
    );
}

const DeleteUserID = async (id) => {
    let [results, fields] = await connection.execute(
        ` Delete From Users
        WHERE id = ?`, [id] 
    );
}

export default {
    getAllUser, getUserByID, CreateNewUser, UpdateUserByID, DeleteUserID
}