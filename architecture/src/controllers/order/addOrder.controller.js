'use strict';

const {
    Response, 
} = require('../../frameworks/common/Response');

module.exports = dependencies => {

    const {
        useCases: {
            order: {
                addOrderUseCase,
            }
        }
    } = dependencies;

    return addOrder = async (req, res, next) => {
        try {
            const {
                body = {},
            } = req;
    
            const {
                id, 
                userId, 
                productIds, 
                date,
                isPaid, 
                meta, 
            } = body;

            const addOrder = addOrderUseCase(dependencies);
            const response = addOrder.execute({
                order: {
                    id, 
                    userId, 
                    productIds,
                    date, 
                    isPaid,
                    meta,
                }
            });

            res.json(new Response({
                status: true, 
                content: response,
            }));

            next();
    
        } catch(err) {
            next(err);
        }
    }
}