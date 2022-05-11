const path = require('path')
const { uploadFile, updateImage, showImage } = require('../services/upload')

const upload = async (req, res, next) => {
    try {
        const { files } = req
        const file = await uploadFile(files, [
            'image/png',
            'image/jpeg',
            'image/gif',
        ])

        res.json({
            message: 'File uploaded',
            file,
        })
    } catch (error) {
        console.log('ERROR: ', error)

        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const { params, files } = req
        const model = await updateImage(params, files)

        res.json({
            message: 'Image updated',
            model,
        })
    } catch (error) {
        console.log('ERROR: ', error)

        next(error)
    }
}

const show = async (req, res, next) => {
    try {
        const { params } = req
        const image = await showImage(params)

        // from Cloudinary
        return res.json({
            url: image,
        })

        // from local server
        // res.sendFile(image)
    } catch (error) {
        console.log('ERROR: ', error)

        if (error.status === 404) {
            return res.sendFile(
                path.join(__dirname, '../public/assets/no-image.jpg')
            )
        }

        return next(error)
    }
}

module.exports = {
    upload,
    update,
    show,
}
