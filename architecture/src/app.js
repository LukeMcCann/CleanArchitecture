'use strict';

require('dotenv').config();

const express = require('express');

const APP = express();

const PORT = process.env.PORT || 3000;

const dependencies = require('./config/dependencies');

const ErrorHandler = require('./frameworks/express/ErrorHandler');

const ROUTES = require('./frameworks/express/routes');

const API_PREFIX = process.env.API_PREFIX || '/api/v1';

module.exports = {
    start: () => {
        // Middleware
        APP.use(express.json());
        APP.use(express.urlencoded({
            extended: true,
        }));

        // Routes 
        APP.use(API_PREFIX, ROUTES(dependencies))
        
        // Common Error handler
        APP.use(ErrorHandler);

        APP.listen(PORT, () => {
            console.log(`Listening on port: ${PORT}`);
        });
    }
};