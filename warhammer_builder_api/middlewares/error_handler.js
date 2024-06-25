// 4 params, first being err

function errorHandler(err,req,res,next) {
    console.log(err);

    const { message = 'defaultError', status = 500 } = err

    res.status(status).json({error: message})

    next()
}

module.exports = errorHandler