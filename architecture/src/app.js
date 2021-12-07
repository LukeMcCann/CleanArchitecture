'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

module.exports = {
    start: () => {
        app.listen(PORT, () => {
            console.log(`Listening on port: ${PORT}`);
        });
    }
};