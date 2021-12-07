'use strict';

module.exports.User = class User {
    constructor({
        id,
        name = null, 
        lastName = null, 
        gender = genders.UNSPECIFIED, 
        meta = {}
    }) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.gender = gender;
        this.meta = meta;
    }
}

const genders = {
    UNSPECIFIED: 0,
    MALE: 1,
    FEMALE: 2,
}

module.exports.userConstants = {
    genders,
}