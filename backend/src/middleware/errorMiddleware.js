const errorMiddleware = (err, req, res, next) => {
    // log error
    console.log(err.stack);

    // specific errors
    if (err.name === 'JsonWebTokenError') return res.status(401).json({message: 'Invalid token.'});
    if (err.name === 'BackendError') return res.status(err.status).json({message: err.message});

    // generic error
    return res.status(500).json({message: "An error occurred."});
};

module.exports = errorMiddleware;
