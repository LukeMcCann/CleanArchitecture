'use strict';

const { User, userConstants } = require('./User');
const { Product } = require('./Product');
const { Order } = require('./Order');

module.exports = {
    User: User,
    Product: Product,
    Order: Order, 
    constants: {
        userConstants
    },
}