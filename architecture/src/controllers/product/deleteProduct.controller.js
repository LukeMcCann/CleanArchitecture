'use strict';

const {
    Response,
} = require('../../frameworks/common/Response');

module.exports = dependencies => {
    const {
        useCases: {
            product: {
                deleteProductUseCase,
            }
        }
    } = dependencies;

    return deleteUser = async (req, res, next) => {
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

            const deleteProduct = deleteProductUseCase(dependencies);
            const response = deleteProduct.execute({
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
}