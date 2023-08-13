const express = require('express');
const router = express.Router();
const Tag = require('../model/addtag');

// Fetch all tags
router.get('/tags', async (req, res) => {
  try {
    const tags = await Tag.find();
    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new tag
router.post('/tags', async (req, res) => {
  const tag = new Tag({
    tagName: req.body.tagName,
    description: req.body.description,
    dateCreated: req.body.dateCreated,
    modules: req.body.modules,
  });

  try {
    const newTag = await tag.save();
    res.status(201).json(newTag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a tag
router.delete('/tags/:id', async (req, res) => {
  try {
    const deletedTag = await Tag.findByIdAndRemove(req.params.id);
    res.json(deletedTag);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a tag
router.put('/tags/:id', async (req, res) => {
  try {
    const updatedTag = await Tag.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTag);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
