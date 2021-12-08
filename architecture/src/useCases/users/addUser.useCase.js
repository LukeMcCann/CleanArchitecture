'use strict';

const { User } = require('../../entities');

module.exports = dependencies => {
    
    const { usersRepository } = dependencies;

    if (!usersRepository) {
        throw new Error('The users repository dependency does not exist!');
    }

    const execute = ({
        name,
        lastName,
        gender,
        meta 
    }) => {
        const user = new User({ 
            name,
            lastName, 
            gender, 
            meta 
        });

        return usersRepository.store(user);
    };

    return { execute };
}