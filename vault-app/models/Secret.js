const mongoose = require('mongoose');
const secretSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Link to User
    title: { type: String, required: true },
    encryptedData: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Secret', secretSchema);