const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const User = require('../models/User');
const auth = require('../middleware/auth'); // Need to create middleware

// Create Job (Manufacturer Only)
router.post('/', auth, async (req, res) => {
    try {
        if (req.user.role !== 'manufacturer') {
            return res.status(403).json({ msg: 'Access Denied: Manufacturers only' });
        }

        const { title, machine_type, fabric_type, worker_count, rate_per_meter, shift, cluster } = req.body;

        const newJob = new Job({
            manufacturer: req.user.id,
            title,
            machine_type,
            fabric_type,
            worker_count,
            rate_per_meter,
            shift,
            location: { cluster }
        });

        const job = await newJob.save();
        res.json(job);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get All Jobs (With Filters)
router.get('/', async (req, res) => {
    try {
        // Simple filter logic
        const { cluster, machine_type } = req.query;
        let query = { status: 'open' };
        
        if (cluster) query['location.cluster'] = cluster;
        if (machine_type) query.machine_type = machine_type;

        const jobs = await Job.find(query).sort({ date: -1 });
        res.json(jobs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
