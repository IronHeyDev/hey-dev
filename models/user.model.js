const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    alias: {
        type: 'String',
        required: [true, "Alias is required"],
        unique: true
    },
    name: {
        type: 'String',
        required: [true, 'Please, write your name']
    },
    surname: {
        type: 'String',
        required: [true, 'Please, write your surname']
    },
    location: {
        type: 'String'
    },
    avatar: {
        type: 'String',
        //TO DO: Default image
    },
    dateOfBirth: {
        type: 'Date'
    },
    devLanguages: {
        type: [String]
    },
    about: {
        type: 'String',
        maxLength: 400
    },
    phone: {
        type: 'Number'
    },
    email: {
        type: 'String',
        required: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        unique: true,
        trim: true,
        lowercase: true
    },
    linkedin: {
        type: 'String'
    },
    github: {
        type: 'String'
    },
    website: {
        type: 'String'
    },
    password: {
        type: 'String',
        required: true,
        match: /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/,
    },
    role: {
        type: 'String',
        enum: ['admin', 'junior', 'recruiter'],
        required: true,
        default: 'junior'
    }
},
{ timestamps: true }
)

schema.pre('save', function (next) {
    if (user.isModified('password')) {
        bcrypt
        .hash(user.password, 10)
        .then(encryptedPassword => { 
            user.password = encryptedPassword;
            next();
        })
        .catch(next);
    } else {
        next();
    }
} )


module.exports = mongoose.model('User', schema);