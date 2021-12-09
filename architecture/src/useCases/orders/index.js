'use strict';

const addOrderUseCase = require('./addOrder.useCase');
const updateOrderUseCase = require('./updateOrder.useCase');
const deleteOrderUseCase = require('./deleteOrder.useCase');
const showOrderUseCase = require('./showOrder.useCase');

module.exports = {
    addOrderUseCase,
    updateOrderUseCase,
    deleteOrderUseCase,
    showOrderUseCase,
}