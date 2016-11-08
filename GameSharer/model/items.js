var mongoose = require('mongoose');
var ItemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    purpose: {
        type: String,
        enum: ['exchange', 'rent', 'sale']
    },
    category: {
        type: String,
        enum: ['game', 'console']
    },
    description: String,
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    status: {
        type: String,
        enum: ["active", "inactive"]
    },
    picUrl: String
});

module.exports = mongoose.model('Item', ItemSchema);



