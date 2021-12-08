'use strict';

module.exports = dependencies => {

    const { usersRepository } = dependencies;

    if (!usersRepository) {
        throw new Error('The users repository dependency does not exist!');
    }

    const execute = ({
        id
    }) => {
        return usersRepository.show(id);
    }

    return {
        execute,
    }
}