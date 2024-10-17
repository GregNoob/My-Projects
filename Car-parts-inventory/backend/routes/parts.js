const express = require('express');
const router = express.Router();
const Part = require('../models/Part');

// Get all the parts
router.get('/', async(req, res) => {
    try {
        const parts = await Part.find();
        res.json(parts);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

// Add a new part
router.post('/', async(req, res) => {
    const part = new Part(req.body);
    try {
        const newPart = await part.save();
        res.status(201).json(newPart);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});

// Update part
router.put('/:id', async(req, res) => {
    try {
        const updatePart = await Part.findByIdAndUpdate(req.params.id, req.body, { new: true });
    } catch(err) {
        res.status(400).json({ message: err.message })
    }
});

// Delete part
router.delete('/:id', async(req, res) => {
    try {
        await Part.findByIdAndDelete(req.params.id.);
        res.josn({ message: 'Partr Deleted' })
    } catch (err) {
        res.status(500).json({ message: message.err });
    }
});

export.module = router;