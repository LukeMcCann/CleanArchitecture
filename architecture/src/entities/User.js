'use strict';

// We pass am object into the constructors of our entities.
// This allows us to use JS destructuring to destruct
// particular arguments into our object, without the need
// of passing null or undefined. It allows us to pass any
// number of arguments, in any order. 

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

// We create an Enum here
// rather than creating this in a utils folder we keep 
// it here as it is associated only with the user. 
// Enums should be declared within the layer which they
// are used. 

const genders = {
    UNSPECIFIED: 0,
    MALE: 1,
    FEMALE: 2,
}

module.exports.userConstants = {
    genders,
}