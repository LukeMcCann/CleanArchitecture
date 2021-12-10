'use strict';

const addProductController = require('./addProduct.controller');
const showProductController = require('./showProduct.controller');
const updateProductController = require('./updateProduct.controller');
const deleteProductController = require('./deleteProduct.controller');

module.exports = dependencies => {
    
    return {
        addProductController: addProductController,
        showProductController: showProductController, 
        updateProductController: updateProductController,
        deleteProductController: deleteProductController,
    }
}