'use strict';

const { 
    Response 
} = require('../../frameworks/common/Response');

module.exports = dependencies => {
    
    const {
        useCases: {
            product: {
                addProductUseCase,
            }
        }
    } = dependencies;

    return addProduct = async (req, res, next) => {
        try {
            const {
                body = {},
            } = req;

            const {
                id, 
                name, 
                description,
                images, 
                price,
                color, 
                meta,
            } = body;

            const addProduct = addProductUseCase(dependencies);
            const response = await addProduct.execute({
                id, 
                name,
                description, 
                images,
                price, 
                color, 
                meta,
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