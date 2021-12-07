'use strict';

const { User, userConstants } = require('./User');
const { Product } = require('./Product');

module.exports = {
    User: User,
    Product: Product,
    constants: {
        userConstants
    },
}