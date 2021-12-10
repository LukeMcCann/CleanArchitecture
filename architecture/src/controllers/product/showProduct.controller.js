'usq strict';

const { 
    Response 
} = require('../../frameworks/common');

module.exports = dependencies => {

    const {
        useCases: {
            product: {
                showProductUseCase,
            }
        }
    } = dependencies;

    return showProduct = async (req, res, next) => {
        try {
            const {
                params = {},
            } = req; 

            const {
                id,
            } = params;

            const showProduct = showProductUseCase(dependencies);
            const response = showProduct.execute({
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