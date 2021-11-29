

/**
 * Mongoose Schema definition - item
 */

const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let itemSchema = new Schema({
    _id: { type: Schema.ObjectId, required: true },
    id: { type: Schema.ObjectId, required: true },
    itemDescription: { type: String, required: true },
    upc: { type: String, required: true },
    brandId: { type: Schema.ObjectId, ref: 'Brand', required: true }
});

module.exports = mongoose.model('Item', itemSchema);
