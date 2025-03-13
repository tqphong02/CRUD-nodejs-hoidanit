
import connection from '../config/database.js';
import CRUDService from '../services/CRUDService.js';
let getAllUsers = async (req, res) => {
    // const [results, fields] = await connection.execute ('select * from Users');
    const results = await CRUDService.getAllUser('Users');
    res.status(200).json({
        message:'ok',
        data: results
    })
}

let createNewUser = async (req, res) => {
    let {email, name, city} = req.body
    if(!email || !name || !city) {
        return res.status(400).json({
            message:'error'
        })
    }
    const results = await CRUDService.CreateNewUser(email, name, city);
    res.status(200).json({
        message:'ok',
        data: results
    })
}

let updateUser = async (req, res) => {
    let {email, name, city, userID} = req.body
    if(!email || !name || !city || !userID) {
        return res.status(400).json({
            message:'error'
        })
    }
    const results = await CRUDService.UpdateUserByID(email, name, city, userID);
    res.status(200).json({
        message:'ok',

    })
}

let deleteUser = async (req, res) => {
    let userID = req.params.id
    if(!userID) {
        return res.status(400).json({
            message:'error'
        })
    }
    const results = await CRUDService.DeleteUserID(userID);
    res.status(200).json({
        message:'ok',

    })
}
export default {
    getAllUsers, createNewUser,
    updateUser, deleteUser
}