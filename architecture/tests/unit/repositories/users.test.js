'use strict';

const Chance = require('chance');
const chance = new Chance();

const { 
    usersRespository, usersRepository 
} = require('../../../src/frameworks/repositories/inMemory');

const { 
    User, 
    constants: {
        userConstants: { 
            genders 
        }, 
    },
} = require('../../../src/entities');
const { store } = require('../../../src/frameworks/repositories/inMemory/usersRepository');

describe('Users repository', () => {
    test('New user should be added and returned', 
    async () => {
        const testUser = new User({ 
            name: chance.name(), 
            lastName: chance.last(),
            gender: genders.FEMALE,
            meta: { hair: { color: 'auburn' }}
        });

        const storedUser = await usersRepository.store(testUser);

        expect(storedUser).toBeDefined();
        expect(storedUser.id).toBeDefined();
        expect(storedUser.name).toBe(testUser.name);
        expect(storedUser.lastName).toBe(testUser.lastName);
        expect(storedUser.meta).toEqual(testUser.meta);
    });

    test('New user should be deleted',
    async () => {

    });

    test('New user should be updated', 
    async () => {

    });
});