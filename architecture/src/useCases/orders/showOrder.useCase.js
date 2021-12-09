'use strict';

module.exports = dependencies => {

    const { ordersRepository } = dependencies;

    if (!ordersRepository) {
        throw new Error('The users repository dependency does not exist!');
    }

    const execute = ({
        id,
    }) => {
        return ordersRepository.show(id);
    }

    return {
        execute,
    }
}