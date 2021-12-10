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
    },
    show: async id => {
        return inMemoryDb.products.find(product => product.id === id);
    },
    update: async product => {
        const productIndex = inMemoryDb.products.findIndex(
            storedProduct => storedProduct.id === product.id
        );

        if (productIndex >= 0) {
            inMemoryDb.products[productIndex] = product;
            return inMemoryDb.products[productIndex];
        }
        return null;
    },
    delete: async product => {
        const productIndex = inMemoryDb.products.findIndex(
            storedProduct => storedProduct.id === product.id
        );

        if (productIndex >= 0) {
            productDeleted = inMemoryDb.products.splice(productIndex, 1);
            return product;
        }
        return null;
    }
}