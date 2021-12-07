'use strict';

module.exports.product = class Product {
    constructor({
        id, 
        name = null,
        description = null, 
        images = null,
        price = null, 
        color = null,
        meta = {},
    }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.images = images;
        this.price = price;
        this.color = color; 
        this.meta = meta;
    } 
}