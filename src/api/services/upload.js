// const path = require('path');
// const fs = require('fs');
// const { v4: uuidv4 } = require('uuid');
const cloudinary = require('cloudinary').v2
const { validateMimetype, verifyModel } = require('../helpers')

cloudinary.config(process.env.CLOUDINARY_URL)

const uploadFile = async (
    files,
    validMimetypes = ['image/jpeg'] /* , folder = '' */
) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve, reject) => {
        const { file } = files

        const isValidFile = validateMimetype(validMimetypes, file.mimetype)

        if (!isValidFile) {
            const error = new Error('Invalid file type')

            error.status = 400

            reject(error)
            return
        }

        // upload to Cloudinary
        const { secureUrl, publicId } = await cloudinary.uploader.upload(
            file.tempFilePath
        )

        resolve({
            secureUrl,
            publicId,
        })

        // upload to local server
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
    })

const deletePreviousImage = (collection, model) => {
    // delete from Cloudinary
    if (!model.image) return

    cloudinary.uploader.destroy(model.image.public_id)

    // delete from local server
    // const imagePath = verifyImage(collection, model);

    // if(!imagePath) return;

    // fs.unlinkSync(imagePath);
}

const updateImage = async (reqParams, files) => {
    try {
        const { collection, id } = reqParams
        const model = await verifyModel(collection, id)

        // clean previous image
        deletePreviousImage(collection, model)

        // Cloudinary
        model.image = await uploadFile(files)

        // local server
        // model.image = await uploadFile(req, undefined, collection);

        await model.save()

        return model
    } catch (error) {
        console.log('UPDATE IMAGE ERROR: ', error)
        throw error
    }
}

const showImage = async (reqParams) => {
    try {
        const { collection, id } = reqParams
        const model = await verifyModel(collection, id)
        const error = new Error('Image not found')

        // from Cloudinary
        if (model.image) {
            return model.image.secure_url
        }

        // from local server
        // const imagePath = verifyImage(collection, model);

        // if(imagePath) {
        //     return imagePath;
        // }

        error.status = 404

        throw error
    } catch (error) {
        console.log('SHOW IMAGE ERROR: ', error)
        throw error
    }
}

// const verifyImage = (collection, model) => {
//     if(!model.image) return false;

//     const imagePath = path.join(__dirname, '../uploads/', collection, model.image);

//     if (fs.existsSync(imagePath)) {
//         return imagePath;
//     } else {
//         return false;
//     }
// };

module.exports = {
    uploadFile,
    updateImage,
    showImage,
}
