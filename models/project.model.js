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
        //TO DO: Default image
    },
    weeks: {
        type: 'Number',
        required: [true, "Weeks is required"]
    },
    location: {
        type: String,
        enum: ['Remote', 'Andalucía', 'Aragón', 'Asturias', 'Islas Baleares', 'Canarias', 'Cantabria', 'Castilla y León', 'Castilla-La Mancha', 'Cataluña', 'Comunidad Valenciana', 'Extremadura', 'Galicia', 'Comunidad de Madrid', 'Murcia', 'Navarra', 'País Vasco', 'La Rioja', 'Ceuta', 'Melilla'],
        default: 'Remote'    
    },
    maxContributors: {
        type: 'Number',
        required: [true, "Please, specify the maximum number of contributors"]
    },
    contributors: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        required: true
    },
    devLanguages: {
        type: [String],
        enum: ['JavaScript', 'HTML', 'CSS', 'PHP', 'Java', 'Python', 'C#', 'C++'],
        required: [true, "Please, select at least one language"]
    },
    languages: {
        type: [String],
        enum: ['English', 'Spanish', 'French', 'German', 'Chinese', 'Portuguese', 'Other'],
        default: 'English'
    },
    state: {
        type: 'String',
        enum: ['Open', 'In progress', 'Completed']
    },
    github: {
        type: 'String'
    }
},
{ timestamps: true }
)

module.exports = mongoose.model('Project', schema);