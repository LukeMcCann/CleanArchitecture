'use strict';

const { Product } = require('../../../src/entities');

module.exports = dependencies => {

    const { productsRepository } = dependencies;

    if (!productsRepository) {
        throw new Error('The users repository dependency does not exist!');
    }

    const execute = ({
        name, 
        description, 
        images, 
        price, 
        color, 
        meta, 
    }) => {
        const product = new Product({
            name, 
            description, 
            images,
            price, 
            color, 
            meta,
        });

        return productsRepository.store(product);
    }

    return { execute };
}