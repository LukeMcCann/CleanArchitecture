'use strict';

module.exports = dependencies => {

    const { productsRepository } = dependencies;

    if (!productsRepository) {
        throw new Error('The users repository dependency does not exist!');
    }

    const execute = ({
        product = {},
    }) => {
        return productsRepository.update(product);
    }

    return { 
        execute, 
    };
}