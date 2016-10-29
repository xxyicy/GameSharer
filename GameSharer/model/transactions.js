var mongoose = require('mongoose');
var TransactionSchema = new mongoose.Schema({
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
    to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    datetime: Date,
    expiration: Date,
    status: String
});

module.exports = mongoose.model('Transaction', TransactionSchema);
