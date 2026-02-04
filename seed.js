const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Property = require('./models/Property');

dotenv.config();

const seedProperty = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for Seeding');

        const property = {
            title: "Test Property " + Date.now(),
            type: "house",
            status: "for-sale",
            price: 500000,
            area: 2000,
            bedrooms: 3,
            bathrooms: 2,
            city: "Test City",
            location: "123 Test St",
            description: "This is a test property inserted via script.",
            features: ["parking", "ac"]
        };

        const created = await Property.create(property);
        console.log('Property Created Successfully:', created._id);

        console.log('Verifying fetch...');
        const fetched = await Property.find({});
        console.log(`Total Properties in DB: ${fetched.length}`);

        process.exit();
    } catch (err) {
        console.error('Seed Error:', err);
        process.exit(1);
    }
};

seedProperty();
