const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [100, 'Title can not be more than 100 characters']
    },
    type: {
        type: String,
        required: true,
        enum: ['apartment', 'house', 'condo', 'villa', 'office', 'land']
    },
    status: {
        type: String,
        required: true,
        enum: ['for-sale', 'for-rent']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price']
    },
    area: {
        type: Number,
        required: [true, 'Please add area in sq ft']
    },
    bedrooms: {
        type: Number,
        required: [true, 'Please add number of bedrooms']
    },
    bathrooms: {
        type: Number,
        required: [true, 'Please add number of bathrooms']
    },
    city: {
        type: String,
        required: [true, 'Please add a city']
    },
    location: {
        type: String,
        required: [true, 'Please add a specific location address']
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [1000, 'Description can not be more than 1000 characters']
    },
    image: {
        type: String,
        default: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80'
    },
    features: {
        type: [String],
        enum: ['parking', 'ac', 'pool', 'gym', 'security', 'balcony', 'garden', 'fireplace']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Property', PropertySchema);
