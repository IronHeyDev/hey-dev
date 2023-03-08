const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({
    alias: {
        type: 'String',
        required: [true, "Alias is required"],
        lowercase: true,
        trim: true,
        maxLength: 10,
        match: /^[a-zA-Z0-9_.-]*$/,
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
        default: 'https://res.cloudinary.com/donpoeiov/image/upload/v1677522181/heydev/heydev-avatar-image_br6qyd.png'
    },
    dateOfBirth: {
        type: 'Date'
    },
    devLanguages: {
        type: [String],
        enum: ['JavaScript', 'HTML', 'CSS', 'PHP', 'Java', 'Python'],
    },
    languages: {
        type: [String],
        enum: ['English', 'Spanish', 'French', 'German', 'Chinese', 'Portuguese', 'Other'],
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
        //match: /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/,
    },
    role: {
        type: 'String',
        enum: ['admin', 'junior', 'recruiter'],
        required: true,
        default: 'junior'
    },
    adquiredChats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}] // Could also be implemented using schema.virtual
},
{ timestamps: true }
)

schema.virtual("contributors", {
    ref: "Contributor",
    localField: "_id",
    foreignField: "user",
    justOne: false
})

schema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt
            .hash(this.password, 10)
            .then(encryptedPassword => { 
                this.password = encryptedPassword;
                next();
            })
            .catch(next);
    } else {
        next();
    }
} )


module.exports = mongoose.model('User', schema);