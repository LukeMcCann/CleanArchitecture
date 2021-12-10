'use strict';

const {
    Response, 
} = require('../../frameworks/common');

module.exports = dependencies => {

    try {
        const {
            useCases: {
                product: {
                    updateProductUseCase, 
                }
            }
        } = dependencies;
    
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
    
        const updateProduct = updateProductUseCase(dependencies);
        const response = updateProduct.execute({
            product: {
                id, 
                name, 
                description,
                images,
                price,
                color, 
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