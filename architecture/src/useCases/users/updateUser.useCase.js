'use strict';

module.exports = dependencies => {

    const { usersRepository } = dependencies;

    if (!usersRepository) {
        throw new Error('The users repository dependency does not exist!');
    }

    const execute = ({
        user = {}
    }) => {
        return usersRepository.update(user);
    };

    return { 
        execute,
    };
}