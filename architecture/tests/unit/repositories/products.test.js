'use strict';

const Chance = require('chance');
const chance = new Chance();
const { cloneDeep } = require('lodash');

const { 
    productsRepository 
} = require('../../../src/frameworks/repositories/inMemory');

const {
    Product
} = require('../../../src/entities');

describe('Products Repository', () => {
    test('New product should be added and returned',
    async () => {
         const testProduct = new Product({
            name: chance.name(),
            description: chance.sentence({ words: 5 }),
            images: [chance.url(), chance.url()],
            price: chance.euro(), 
            color: chance.color({ format: 'hex' }),
            meta: {}
         });

        const storedProduct = await productsRepository.store(testProduct);

        expect(storedProduct).toBeDefined();
        expect(storedProduct.id).toBeDefined();
        expect(storedProduct.name).toBe(testProduct.name);
        expect(storedProduct.description).toBe(testProduct.description);
        expect(storedProduct.price).toBe(testProduct.price);
        expect(storedProduct.color).toBe(testProduct.color);
        expect(storedProduct.meta).toEqual(testProduct.meta);

        const returnedProduct = await productsRepository.show(storedProduct.id);

        expect(returnedProduct).toEqual(storedProduct);
    });

    test('Product should be updated', 
    async () => {
        const testProduct = new Product({
            name: chance.name(),
            description: chance.sentence({ words: 5 }),
            price: chance.euro(), 
            color: chance.color({ format: 'hex' }),
            meta: {}
         });

        const storedProduct = await productsRepository.store(testProduct);
        expect(storedProduct).toBeDefined();

        const clonedProduct = cloneDeep({
            ...storedProduct, 
            name: chance.name(),
            description: chance.sentence({ words: 5 }),
            price: chance.euro(), 
            color: chance.color({ format: 'hex' }),
            meta: {}
        });

        const updatedProduct = await productsRepository.update(clonedProduct);
        
        expect(updatedProduct).toEqual(clonedProduct);
    });

    test('Product should be deleted',
    async () => {
        const productToKeep = new Product({
            name: chance.name(),
            description: chance.sentence({ words: 5 }),
            price: chance.euro(), 
            color: chance.color({ format: 'hex' }),
            meta: {}
         });

         const productToDelete = new Product({
            name: chance.name(),
            description: chance.sentence({ words: 5 }),
            price: chance.euro(), 
            color: chance.color({ format: 'hex' }),
            meta: {
                deliver: {
                    from: 'China',
                }
            }
         });

         const [ storedProductToKeep, storedProductToDelete ] = await Promise.all([
             productsRepository.store(productToKeep),
             productsRepository.store(productToDelete),
         ]);

        expect(storedProductToKeep).toBeDefined();
        expect(storedProductToDelete).toBeDefined();

         const deletedProductA = await productsRepository.delete(storedProductToDelete);
         expect(deletedProductA).toEqual(storedProductToDelete);

         const keptProduct = await productsRepository.show(productToKeep.id)
         expect(keptProduct).toEqual(storedProductToKeep);
 
         const deletedProductB = await productsRepository.show(productToDelete.id);
         expect(deletedProductB).toBeUndefined();

         const definedProduct = await productsRepository.show(storedProductToKeep.id);
         expect(definedProduct).toBeDefined();
    });
});