const express = require('express');
const router = express.Router();
const Response = require('../models/Response');
const Job = require('../models/Job');
const User = require('../models/User');
const auth = require('../middleware/auth');

// @route   POST api/responses/apply/:jobId
// @desc    Worker applies for a job (The "One Click Yes")
// @access  Private (Worker only)
router.post('/apply/:jobId', auth, async (req, res) => {
    try {
        // 1. Check Role
        if (req.user.role !== 'worker') {
            return res.status(403).json({ msg: 'Only workers can apply' });
        }

        const jobId = req.params.jobId;
        const workerId = req.user.id;

        // 2. Check if Job exists
        const job = await Job.findById(jobId);
        if (!job) return res.status(404).json({ msg: 'Job not found' });

        // 3. Check if already applied
        const existingResponse = await Response.findOne({ job: jobId, worker: workerId });
        if (existingResponse) {
            return res.status(400).json({ msg: 'Already applied to this job' });
        }

        // 4. Get Worker Details for Snapshot
        const worker = await User.findById(workerId).select('-password');

        // 5. Create Response
        const newResponse = new Response({
            job: jobId,
            worker: workerId,
            manufacturer: job.manufacturer,
            worker_snapshot: {
                name: worker.name,
                phone: worker.phone,
                skills: worker.skills
            }
        });

        await newResponse.save();

        // 6. Return Success (with Manufacturer Contact if needed per SRS flow)
        // For MVP, we confirm application.
        res.json(newResponse);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/responses/my-applications
// @desc    Get all jobs I applied to (Worker)
// @access  Private (Worker)
router.get('/my-applications', auth, async (req, res) => {
    try {
        const responses = await Response.find({ worker: req.user.id })
            .populate('job', ['title', 'rate_per_meter', 'location'])
            .sort({ date: -1 });
        res.json(responses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/responses/job/:jobId
// @desc    Get all applicants for a specific job (Manufacturer)
// @access  Private (Manufacturer)
router.get('/job/:jobId', auth, async (req, res) => {
    try {
        // Verify job belongs to this manufacturer
        const job = await Job.findById(req.params.jobId);
        if (!job) return res.status(404).json({ msg: 'Job not found' });
        
        if (job.manufacturer.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        const responses = await Response.find({ job: req.params.jobId })
            .populate('worker', ['name', 'phone', 'skills', 'experience', 'rating']);
        
        res.json(responses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
