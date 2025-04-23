const Item = require('../models/Item');

// Get all items
const getItems = async (req, res) => {
    try {
        const items = await Item.findAll();
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new item
const createItem = async (req, res) => {
    try {
        const newItem = await Item.create(req.body);
        res.status(201).json(newItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update an item
const updateItem = async (req, res) => {
    try {
        const [updated] = await Item.update(req.body, {
            where: { id: req.params.id }
        });
        
        if (updated) {
            const updatedItem = await Item.findByPk(req.params.id);
            res.status(200).json(updatedItem);
        } else {
            res.status(404).json({ error: 'Item not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete an item
const deleteItem = async (req, res) => {
    try {
        const deleted = await Item.destroy({
            where: { id: req.params.id }
        });
        
        if (deleted) {
            res.status(200).json({ message: 'Item deleted successfully' });
        } else {
            res.status(404).json({ error: 'Item not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getItems, createItem, updateItem, deleteItem };