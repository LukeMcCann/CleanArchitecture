'use strict';

module.exports = dependencies => {

    const { ordersRepository } = dependencies;

    const execute = ({
        order = {},
    }) => {
        return ordersRepository.delete(order);
    }

    return { 
        execute,
    };
}