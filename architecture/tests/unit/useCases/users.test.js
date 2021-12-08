'use strict';

const Chance = require('chance');
const { userConstants } = require('../../../src/entities/User');
const chance = new Chance();
const { v4: uuidV4 } = require('uuid');

const { 
    user: {
        addUserUseCase
    }, user,
} = require('../../../src/useCases');

const { 
    User, 
    constants: {
        userConstants: { 
            genders 
        }, 
    },
} = require('../../../src/entities');

describe('User use cases', () => {

    const mockUserRepo = {
        store: jest.fn(async user => ({
            ...user, 
            id: uuidV4()
        }))
    }
    
    const dependencies = {
        usersRepository: mockUserRepo
    }

    test('Add user use case',
    async () => {
        const testUserData = {
            name: chance.name(),
            lastName: chance.last(),
            gender: genders.MALE,
            meta: {
                hair: {
                    color: 'burgundy'
                }
            }
        }

        const storedUser = await addUserUseCase(dependencies).execute(testUserData);

        expect(storedUser).toBeDefined();
        expect(storedUser.id).toBeDefined();
        expect(storedUser.name).toBe(testUserData.name);
        expect(storedUser.lastName).toBe(testUserData.lastName);
        expect(storedUser.gender).toBe(testUserData.gender);
        expect(storedUser.meta).toEqual(testUserData.meta);

        // check that the dependencies called as expected
        const call = mockUserRepo.store.mock.calls[0][0];
        expect(call.id).toBeUndefined();
        expect(call.name).toBe(testUserData.name);
        expect(call.lastName).toBe(testUserData.lastName);
        expect(call.gender).toBe(testUserData.gender);
        expect(call.meta).toBe(testUserData.meta);
    });
});