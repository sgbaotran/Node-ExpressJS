const { constants } = require("../constants")
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({ title: "JSON is missing!", statusCode: statusCode, message: err.message, error: err.stack })
            break;
        case constants.UNAUTHORIZED:
            res.json({ title: "Unauthorized!", statusCode: statusCode, message: err.message, error: err.stack })
            break
        case constants.FORBIDDEN:
            res.json({ title: "Forbidden!", statusCode: statusCode, message: err.message, error: err.stack })
            break
        case constants.NOT_FOUND :
            res.json({ title: "Not found!", statusCode: statusCode, message: err.message, error: err.stack })
            break
        default:
            res.json({ title: "Unknown error!", statusCode: statusCode, message: err.message, error: err.stack })
            break;
    }
};

module.exports = { errorHandler }