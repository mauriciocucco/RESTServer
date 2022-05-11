const { searchByCollection } = require('../services/search')

const search = async (req, res, next) => {
    try {
        const { params } = req
        const result = await searchByCollection(params)
        let results = null

        if (!result) {
            results = []
        } else if (Array.isArray(result)) {
            results = result
        } else {
            results = [result]
        }

        res.json({
            results,
        })
    } catch (error) {
        console.log('ERROR: ', error)

        next(error)
    }
}

module.exports = {
    search,
}
