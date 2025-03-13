const express = require('express');
// import express from 'express';
const router = express.Router();
import multer from 'multer';
import path  from 'path';
var appRoot = require('app-root-path')
import homeController from '../controllers/homeController.js'
const { getHomepage, getHoidanit, 
        postCreateUser, getCreatePage, 
        getUpdatePage, postUpdateUser, postDeleteUser,
        postRemoveUser, getUploadFile, handleUploadfile,
        handleUploadMultipleFiles


} = homeController;


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null,appRoot + '/src/public/images/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});




const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let upload = multer({storage: storage , fileFilter: imageFilter});
let UploadMultipleFiles = multer({storage: storage , fileFilter: imageFilter}).array('multiple_images', 3);


router.get('/', getHomepage);
router.get('/hoidanit', getHoidanit) ;
router.get('/create', getCreatePage);
router.get('/update/:id', getUpdatePage)
router.post('/create-user', postCreateUser);
router.post('/update-user', postUpdateUser);
router.post('/delete-user/:id', postDeleteUser);
router.post('/delete-user', postRemoveUser);
router.get('/upload', getUploadFile);
router.post('/upload-profile-pic', upload.single('profile_pic'), handleUploadfile);
router.post('/upload-multiple-images', (req, res, next) => {
    UploadMultipleFiles(req, res, (err) => {
            if(err instanceof multer.MulterError && err.code === "LIMIT_UNEXPECTED_FILE"){
                res.send('LIMIT_UNEXPECTED_FILE')
            } else if (err) {
                res.send(err)
            } else {
                next();
            }
        })
    }, handleUploadMultipleFiles )
export default router;