const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { validateMimetype, verifyModel } = require('../lib');
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const uploadFile = async (req, validMimetypes = ['image/jpeg'], folder = '') => {
    return new Promise(async (resolve, reject) => {
        const { file } = req.files;

        const isValidFile = validateMimetype(validMimetypes, file.mimetype);

        if(!isValidFile) {
            return reject({
                code: 400,
                error: 'Invalid file type'
            })
        }

        //upload to Cloudinary
        const { tempFilePath } = req.files.file;
        const { secure_url, public_id } = await cloudinary.uploader.upload(tempFilePath);

        resolve({
            secure_url, public_id
        });

        //upload to local server
        // const uniqueFileName = uuidv4() + '.' + file.mimetype.split('/')[1];
        // const uploadPath = path.join(__dirname, '../uploads/', folder, uniqueFileName);

        // // Use the mv() method to place the file somewhere on your server
        // file.mv(uploadPath, (err) => {
        //     if (err) {
        //         return reject({
        //             code: 500,
        //             error: err
        //         });
        //     }
        
        //         resolve(uniqueFileName);
        //     });
    });
};

const updateImage = async (req) => {
    try {
        const { collection, id } = req.params;
        const model = await verifyModel(collection, id);

        //clean previous image
        deletePreviousImage(collection, model);

        //Cloudinary
        model.image = await uploadFile(req);

        //local server
        // model.image = await uploadFile(req, undefined, collection);

        await model.save();

        return model;
        
    } catch (error) {
        throw error;
    }
};

const deletePreviousImage = (collection, model) => {
    //delete from Cloudinary
    if(!model.image) return;
    
    cloudinary.uploader.destroy(model.image.public_id);
    
    //delete from local server
    // const imagePath = verifyImage(collection, model);

    // if(!imagePath) return;

    // fs.unlinkSync(imagePath);
};

const showImage = async (req) => {
    try {
        const { collection, id } = req.params;
        const model = await verifyModel(collection, id);

        //from Cloudinary
        if(model.image) {
            return model.image.secure_url;
        }

        //from local server
        // const imagePath = verifyImage(collection, model);

        // if(imagePath) {
        //     return imagePath;
        // }

        throw {
            code: 404,
            error: 'Image not found'
        }

    } catch (error) {
        throw error;
    }
};

const verifyImage = (collection, model) => {
    if(!model.image) return false;

    const imagePath = path.join(__dirname, '../uploads/', collection, model.image);

    if (fs.existsSync(imagePath)) {
        return imagePath;
    } else {
        return false;
    }
};

module.exports = {
    uploadFile,
    updateImage,
    showImage
};