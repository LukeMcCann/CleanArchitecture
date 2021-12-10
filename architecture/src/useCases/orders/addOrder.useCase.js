'use strict';

const { Order } = require("../../entities");
const { isEmpty } = require('lodash');
const { ResponseError, ValidationErrror } = require("../../frameworks/common");

module.exports = dependencies => {

    const { 
        ordersRepository,
        useCases : {
            user: {
                showUserUseCase,
            },
            product: {
                showProductUseCase,
            },
        }
    } = dependencies;
    
    if (!ordersRepository) {
        throw new Error('The users repository dependency does not exist!');
    }

    if (!showUserUseCase) {
        throw new Error('showUserUseCase is not a dependency!');
    }

    if (!showProductUseCase) {
        throw new Error('showProductUseCase is not a dependency!');
    }

    const showUser = showUserUseCase(dependencies).execute;
    const showProduct = showProductUseCase(dependencies).execute;

    const getValidationErrors = async ({
        order,
    }) => {
        const returnable = [];

        const { 
            productIds,
            userId,
        } = order;

        const products = await Promise.all(productIds.map(id => showProduct({id})));

        const notFoundIds = products.reduce((acc, product, i) => {
            if (!product) {
                acc.push(productIds[i]);
                return acc;
            }
        }, []);

        if (!isEmpty(notFoundIds)) {
            returnable.push(new ValidationErrror({ field: 'productsIds', msg: `No products with ids ${noutFoundIds.join(', ')}`}));
        }

        const user = await showUser({ id: userId });
        if (!user) {
            returnable.push(new ValidationErrror({ field: 'userId', msg: `No user with id ${userId}` }));
        }

        return returnable;
    }

    const execute = async ({
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

        const validationErrors = await validationErrors({ order });

        if (!isEmpty(validationErrors)) {
            return Promise.reject(new ResponseError({
                status: 403, 
                msg: 'Validation Error',
                reason: 'Unexpected request input provided',
                validationErrors
            }));
        }

        return ordersRepository.store(order);
    }

    return { 
        execute,
    };
}