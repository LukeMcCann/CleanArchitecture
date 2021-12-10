'use strict';

const addOrderController = require('./addOrder.controller');
const updateOrderController = require('./updateOrder.controller');
const showOrderController = require('./showOrder.controller');
const deleteOrderController = require('./deleteOrder.controller');

module.exports = dependencies => {

    return {
        addOrderController: addOrderController,
        updateOrderController: updateOrderController,
        showOrderController: showOrderController,
        deleteOrderController: deleteOrderController,
    }
}