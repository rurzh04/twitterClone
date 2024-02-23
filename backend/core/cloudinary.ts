import { v2 as cloudinary } from 'cloudinary';

// @ts-ignore
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME || 'dfs4qadbq',
    api_key: process.env.CLOUD_API_KEY || 991763717299454,
    api_secret: process.env.CLOUD_API_SECRET || 'FTIQfSey9pov11f2G4Bli7Gy93c',
});

export default cloudinary;
