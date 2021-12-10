'use strict';

const {
    Response,
} = require('../../frameworks/common');

module.exports = dependencies => {

    const { 
        useCases: {
            user: {
                showUserUseCase,
            }
        }
    } = dependencies;


    return showUser = async (req, res, next) => {
        try {
            const {
                params ={},
            } = req; 

            const {
                id,
            } = params;

            const showUser = showUserUseCase(dependencies);
            const response = await showUser.execute({
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