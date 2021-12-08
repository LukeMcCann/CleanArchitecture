'use strict';

const Chance = require('chance');
const chance = new Chance();
const { v4: uuidV4 } = require('uuid');

const { 
    user: {
        addUserUseCase, 
        showUserUseCase,
        updateUserUseCase,
    }
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
        store: jest.fn(
            async user => ({
                ...user, 
                id: uuidV4()
            })
        ),
        show: jest.fn(
            async id => ({
                id,
                name: chance.name(),
                lastName: chance.last(),
                gender: genders.FEMALE,
                meta: {}
            })
        ), 
        update: jest.fn(
            async user => user
        )
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

    test('Show user use case',
    async () => {
        const mockId = uuidV4();

        const userById = await showUserUseCase(dependencies).execute({ id: mockId });

        expect(userById).toBeDefined();
        expect(userById.id).toBe(mockId);
        expect(userById.name).toBeDefined();
        expect(userById.lastName).toBeDefined();
        expect(userById.gender).toBeDefined();
        expect(userById.meta).toBeDefined();

        const expectedId = mockUserRepo.show.mock.calls[0][0];
        expect(expectedId).toBe(mockId);
    });

    test('Update user use case',
    async () => {
        const testData = {
            id: uuidV4(),
            name: chance.name(),
            lastName: chance.lastName,
            gender: genders.MALE, 
            meta: {
                education: {
                    degree: {
                        title: 'Software Engineering',
                        level: 'MEng',
                        grade: '1st'
                    }
                }
            }
        }

        const updatedUser = await updateUserUseCase(dependencies).execute({
            user: testData
        });

        expect(updatedUser).toEqual(testData);

        const expectedUser = mockUserRepo.update.mock.calls[0][0];
        expect(expectedUser).toEqual(updatedUser);
    });
});