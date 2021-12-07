'use strict';

const Chance = require('chance');
const chance = new Chance();
const { cloneDeep } = require('lodash');

const { 
    usersRepository 
} = require('../../../src/frameworks/repositories/inMemory');

const { 
    User, 
    constants: {
        userConstants: { 
            genders 
        }, 
    },
} = require('../../../src/entities');

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

        const returnedUser = await usersRepository.show(storedUser.id);
        
        expect(returnedUser).toEqual(storedUser);
    });

    test('User should be deleted',
    async () => {
        const userToKeep = new User({
            name: chance.name(),
            lastName: chance.last(),
            gender: genders.MALE, 
            meta: { hair: { color: 'blonde' }},
        });

        const userToDelete = new User({
            name: chance.name(),
            lastName: chance.last(),
            gender: genders.UNSPECIFIED, 
            meta: { hair: { color: 'green' }},
        });

        const [ storedUserToKeep, storedUserToDelete ] = await Promise.all([
            usersRepository.store(userToKeep),
            usersRepository.store(userToDelete)
        ]);

        expect(storedUserToKeep).toBeDefined();
        expect(storedUserToDelete).toBeDefined();

        const { status } = await usersRepository.delete(userToDelete);

        expect(status).toEqual(204);

        const keptUser = await usersRepository.show(userToKeep.id)
        expect(keptUser).toEqual(userToKeep);

        const deletedUser = await usersRepository.show(userToDelete.id);
        expect(deletedUser).toBeUndefined();
    });

    test('User should be updated', 
    async () => {
        const testUser = new User({
            name: chance.name(),
            lastName: chance.last(),
            gender: genders.UNSPECIFIED, 
            meta: { hair: { color: 'grey' }}, 
        });

        const storedUser = await usersRepository.store(testUser);
        expect(storedUser).toBeDefined();

        const clonedUser = cloneDeep({
            ...storedUser, 
            name: chance.name(),
            gender: genders.MALE,
        });

        const updatedUser = await usersRepository.update(clonedUser);
        expect(updatedUser).toEqual(clonedUser);
    });
});