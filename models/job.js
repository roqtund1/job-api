const mongoose = require('mongoose');
const {Schema} = mongoose;

const jobSchema = new Schema({
    company: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: [true, 'Company is required.']
    },
    position: {
        type: String,
        minlength: 3,
        maxlength: 100,
        required: [true, 'Position is required']
    },
    status: {
        type: String,
        enum: ['Interview', 'Pending', 'Declined'],
        default: 'Pending'
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a user.']
    }
}, {timestamps: true})


// Job model/Class
const Job = mongoose.model('Job', jobSchema);


module.exports = Job;