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
        return { status: 404 };
    },
    delete: async product => {
        const productIndex = inMemoryDb.products.findIndex(
            storedProduct => storedProduct.id === product.id
        );

        if (productIndex >= 0) {
            inMemoryDb.products.splice(productIndex, 1);
        }

        const productDeleted = inMemoryDb.products.findIndex(
            deletedProduct => deletedProduct.id === product.id
        );


        if (productDeleted) {
            return { status: 204 };
        }

        return { status: 500 };
    }
}