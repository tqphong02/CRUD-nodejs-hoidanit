const connection = require('../config/database');
// import connection from '../config/database.js';
import multer from 'multer';
import CRUDService from '../services/CRUDService.js';
const { getAllUser, getUserByID, UpdateUserByID, DeleteUserID } = CRUDService;
const getHomepage = async(req, res) => {
    let results = await getAllUser();
    return res.render('home.ejs', {listUsers: results} )
}
const getHoidanit = (req, res) => {
    res.render('sample.ejs')
}

const postCreateUser = async (req, res) => {
    // let email = req.body.email
    // let name = req.body.name
    // let city = req.body.city
    
    // console.log(">>mail:", email, 'name:', name, 'city:', city)
    
    // INSERT INTO Users (email, name, city)
    // VALUES ( 'phong', 'test', 'saigon');
    
    // connection.query (
        //     ` INSERT INTO 
        //     Users (email, name, city) 
        //     VALUES ( ?, ?, ?);`,
        //     [email, name, city],
        //     function(err, results){
            //         res.send("create user succeed")
            //     }
            // )
    let {email, name, city} = req.body
    const [results, fields] = await connection.query (
        `INSERT INTO Users (email, name, city) VALUES (?, ?, ?);`,[email, name, city],
    );
    res.redirect('/')
}
const getCreatePage = (req, res) => {
    res.render('create.ejs')
}

const getUpdatePage = async (req, res) => {
    const userID = req.params.id
    let user = await getUserByID(userID)
    res.render('edit.ejs', {userEdit : user})
}

const postUpdateUser = async (req, res) => {
    let {email, name, city, userID} = req.body
    await UpdateUserByID(email, name, city, userID);

    // res.send('Update user succeed')
    res.redirect('/')
}

const postDeleteUser = async (req, res) => {
    const userID = req.params.id
    let user = await getUserByID(userID)
    res.render('delete.ejs',{userEdit : user})
}

const postRemoveUser = async (req, res) => {
    let {userID} = req.body
    await DeleteUserID(userID);

    // res.send('Update user succeed')
    res.redirect('/')
}
const getUploadFile = async (req, res) => {
    return res.render('uploadFile.ejs')
}
// let upload = multer().single('profile_pic');
// let uploadMultiple = multer().array('multiple_images');

const handleUploadfile = async (req, res) => {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="/images/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
}

let handleUploadMultipleFiles = async (req, res) => {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.files) {
            return res.send('Please select an image to upload');
        }
        let result = "You have uploaded these images: <hr />";
        const files = req.files;
        let index, len;

        // Loop through all the uploaded images and display them on frontend
        for (index = 0, len = files.length; index < len; ++index) {
            result += `<img src="/images/${files[index].filename}" width="300" style="margin-right: 20px;">`;
        }
        result += '<hr/><a href="/upload">Upload more images</a>';
        res.send(result);
}

export default { 
    getHomepage, getHoidanit,
    postCreateUser, getCreatePage, 
    getUpdatePage, postUpdateUser, 
    postDeleteUser, postRemoveUser,
    getUploadFile, handleUploadfile,
    handleUploadMultipleFiles
}