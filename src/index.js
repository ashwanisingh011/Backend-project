import dotenv from 'dotenv';
import mongoose from 'mongoose';
import {app} from './app.js';

// Load environment variables
dotenv.config({ path: './.env' });

const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI;

async function start() {
    if (!MONGODB_URI) {
        console.error('Missing MONGODB_URI in environment. Please set it in your .env file.');
        process.exit(1);
    }

    try {
        // Helpful option defaults
        mongoose.set('strictQuery', false);

        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB connected');

        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    } catch (err) {
        console.error('Failed to connect to MongoDB:');
        console.error(err.message || err);
        console.error('\nCommon causes: incorrect URI, missing DB name, network access (Atlas IP whitelist), or DNS issues.');
        process.exit(1);
    }
}

start();

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('\nSIGINT received: closing MongoDB connection');
    await mongoose.disconnect();
    process.exit(0);
});