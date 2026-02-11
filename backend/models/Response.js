const mongoose = require('mongoose');

const ResponseSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    worker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    manufacturer: {
        type: mongoose.Schema.Types.ObjectId, // Denormalized for quick query
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['applied', 'contacted', 'hired', 'rejected'],
        default: 'applied'
    },
    // Snapshot of contact details at time of application (SRS Requirement)
    worker_snapshot: {
        name: String,
        phone: String,
        skills: [String]
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Prevent duplicate applications
ResponseSchema.index({ job: 1, worker: 1 }, { unique: true });

module.exports = mongoose.model('Response', ResponseSchema);
