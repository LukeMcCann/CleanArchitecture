'use strict';

const { inMemory: inMemoryDb } = require('../../database');
const { v4: uuidV4 } = require('uuid');

module.exports = {
    store: async product => {
        if (!product.id) {
            product.id = uuidV4();
        }

        inMemoryDb.products.push(product);

        return product;
    }
}