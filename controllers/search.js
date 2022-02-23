const { response } = require('express');
const { searchByCollection } = require('../services/search');

const search = async (req, res = response) => {
    try {
        const result = await searchByCollection(req);
    
        res.json({
            results: !result ? [] : Array.isArray(result) ? result : [result]
        })
        
    } catch (error) {
        console.log('ERROR: ', error);
        
        next(error);
    }

};

module.exports = {
    search
};