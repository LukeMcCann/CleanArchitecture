'use strict';

const useCases = require('../useCases');
const repositories = require('../frameworks/repositories');

module.exports = {
    useCases,
    ...repositories,
}