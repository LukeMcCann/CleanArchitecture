'use strict';

const {
    Response, 
} = require('../../frameworks/common');

module.exports = dependencies => {

    const {
        useCases: {
            order: {
                showOrderUseCase, 
            }
        }
    } = dependencies;


    return showOrder = async (req, res, next) => {
        try {
            const {
                params = {},
            } = req;
        
            const {
                id, 
            } = params;
        
            const showOrder = showOrderUseCase(dependencies);
            const response = showOrder.execute({
                id,
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