'use strict';

const { 
    Response, 
    ResponseError,
}= require('../common');

module.exports = (err, req, res, next) => {
    
    const error = new ResponseError({ 
        status: err.status || 500,
        msg: err.msg || 'Server Error',
        reason: err.reason || err.stack || 'Something went wrong!',
        url: req.originalUrl, 
        ip: req.ip,
    });

    req.status(error.status);

    res.json(new Response({
        status: false, 
        error,
    }));
}