import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();

const connectionString = process.env.DATABASE_URL;

export async function connectToDatabase(callback){
    mongoose.connect(connectionString).then(()=>{
        console.log('Database connesso');
        callback();
    }).catch((error) => {
        console.log(error);
    });
}