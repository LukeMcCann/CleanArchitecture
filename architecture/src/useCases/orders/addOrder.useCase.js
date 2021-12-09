'use strict';

const { Order } = require("../../entities");

module.exports = dependencies => {

    const { ordersRepository } = dependencies;
    
    if (!ordersRepository) {
        throw new Error('The users repository dependency does not exist!');
    }

    const execute = ({
        userId, 
        productIds, 
        date, 
        isPaid, 
        meta,
    }) => {
        const order = new Order({
            userId, 
            productIds, 
            date, 
            isPaid, 
            meta,
        });

        return ordersRepository.store(order);
    }

    return { execute };
}