const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: 'String',
        required: [true, "Name is required"]
    },
    description: {
        type: 'String',
        required: [true, "A description is required"]
    },
    image: {
        type: 'String',
        default: 'https://res.cloudinary.com/donpoeiov/image/upload/v1677522181/heydev/heydev-project-image_jrxn3t.png'
    },
    weeks: {
        type: 'Number',
        required: [true, "Weeks is required"]
    },
    location: {
        type: String,
        enum: ['Remote', 'Local'],
        default: 'Remote'    
    },
    maxContributors: {
        type: 'Number',
        required: [true, "Please, specify the maximum number of contributors"],
        default: 6
    },
    devLanguages: {
        type: [String],
        enum: ['JavaScript', 'HTML', 'CSS', 'PHP', 'Java', 'Python'],
       required: [true, "Please, select at least one language"]
    },
    languages: {
        type: [String],
        enum: ['English', 'Spanish', 'French', 'German', 'Chinese', 'Portuguese', 'Other'],
        default: 'English'
    },
    state: {
        type: 'String',
        enum: ['Open', 'In progress', 'Completed'],
        default: 'Open'
    },
    github: {
        type: 'String'
    }
},
{ timestamps: true }
)

schema.virtual("contributors", {
    ref: "Contributor",
    localField: "_id",
    foreignField: "project",
    justOne: false
})

module.exports = mongoose.model('Project', schema);