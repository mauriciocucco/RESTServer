const path = require('path');
const { response } = require("express");
const { uploadFile, updateImage, showImage } = require("../services/upload");

const upload = async (req, res = response, next) => {
    try {
        const file = await uploadFile(req, ['image/png', 'image/jpeg', 'image/gif']);

        res.json({
            message: "File uploaded",
            file
        })
        
    } catch (error) {
        console.log('ERROR: ', error);

        next(error);
    }
};

const update = async (req, res = response, next) => {
    try {
        const model = await updateImage(req);

        res.json({
            message: "Image updated",
            model
        })
        
    } catch (error) {
        console.log('ERROR: ', error);

        next(error);
    }
};

const show = async (req, res = response, next) => {
    try {
        const image = await showImage(req);

        //from Cloudinary
        res.json({
            url: image
        });

        //from local server
        // res.sendFile(image)
        
    } catch (error) {
        console.log('ERROR: ', error);

        if(error.status === 404) {
            return res.sendFile(path.join(__dirname, '../public/assets/no-image.jpg'));
        }

        next(error);
    }
};

module.exports = {
    upload,
    update,
    show
}