var mongoose = require('mongoose');
var ItemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    purpose: {
        type: String,
        enum: ['exchange', 'rent', 'sale']
    },
    category: String,
    description: String,
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    status: String,
    picUrl: [String]
});

module.exports = mongoose.model('Item', ItemSchema);



