'use strict';

module.exports.Order = class Order {
    constructor({
        id, 
        userId = null,
        productIds = [], 
        date = new Date(),
        isPaid = false,
        meta = {},
    }) {
        this.id = id;
        this.userId = userId;
        this.productIds = productIds;
        this.date = date; 
        this.isPaid = isPaid;
        this.meta = meta; 
    }
}