const path = require('path');
const { response } = require("express");
const { uploadFile, updateImage, showImage } = require("../services/upload");

const upload = async (req, res = response) => {
    try {
        const file = await uploadFile(req, ['image/png', 'image/jpeg', 'image/gif']);

        res.json({
            message: "File uploaded",
            file
        })
        
    } catch (error) {
        console.log('ERROR: ', error);

        res.status(error.code).json({
            error: error.code === 500 ? "Internal server error" : error.error
        });
    }
};

const update = async (req, res = response) => {
    try {
        const model = await updateImage(req);

        res.json({
            message: "Image updated",
            model
        })
        
    } catch (error) {
        console.log('ERROR: ', error);

        res.status(error.code).json({
            error: error.error
        });
    }
};

const show = async (req, res = response) => {
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

        if(error.code === 404) {
            return res.sendFile(path.join(__dirname, '../public/assets/no-image.jpg'));
        }

        res.status(error.code).json({
            error: error.error
        });
    }
};

module.exports = {
    upload,
    update,
    show
}