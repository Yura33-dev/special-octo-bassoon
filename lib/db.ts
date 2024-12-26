/* eslint-disable  @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';

import { config } from './config';

interface MongooseConnection {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const options: mongoose.ConnectOptions = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(config.DB_URI, options).then(mongoose => {
      console.log('✅ MongoDB connected successfully');
      return mongoose.connection;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
