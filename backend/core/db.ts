import mongoose from 'mongoose';

mongoose.Promise = Promise;
mongoose.connect(
    process.env.MONGODB_URL ||
        'mongodb+srv://arnat:Sulpak12345@cluster0.rphn4uh.mongodb.net/?retryWrites=true&w=majority'
);

const db = mongoose.connection;

db.on('error', (err) => {
    console.log(`error DB ${err}`);
});

export { db, mongoose };
