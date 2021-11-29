

/**
 * Mongoose Schema definition - brand
 */

const mongoose = require('mongoose');
const ObjectId = mongoose.ObjectId;

let Schema = mongoose.Schema;

let brandSchema = new Schema({
    _id: { type: ObjectId, required: true },
    id: { type: ObjectId, required: true },
    description: { type: String, required: true },
    manufacturer: { type: String, required: false },
    address: { type: String, required: false },
    website: { type: String, required: false }
});

module.exports = mongoose.model('Brand', brandSchema);
