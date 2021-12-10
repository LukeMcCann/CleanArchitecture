'use strict';

const express = require('express');

const {
    orderControllers,
} = require('../../../controllers');

module.exports = dependencies => {

    const router = express.Router();

    const {
        addOrderController,
        showOrderController, 
        updateOrderController, 
        deleteOrderController,
    } = orderControllers(dependencies);

    router.route('/')
        .post(addOrderController)
        .delete(deleteOrderController)
        .put(updateOrderController);

    router.route('/:id')
        .get(showOrderController);

    return router; 
}