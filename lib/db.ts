'use server';

/* eslint-disable  @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';

import { config } from './config';
import { DB_CONNECTION_FAILED } from './constants';

interface MongooseConnection {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function dbConnect(
  retries: number = 3,
  delayMs: number = 5000
): Promise<mongoose.Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const options: mongoose.ConnectOptions = {
      bufferCommands: false,
    };

    cached.promise = (async () => {
      for (let attempt = 1; attempt <= retries; attempt++) {
        try {
          console.log(`🔄 Attempt ${attempt} to connect to MongoDB...`);
          const connection = await mongoose.connect(config.DB_URI, options);
          console.log('✅ MongoDB connected successfully');
          return connection.connection;
        } catch (error) {
          console.error(
            `❌ MongoDB connection attempt ${attempt} failed:`,
            error
          );

          if (attempt < retries) {
            console.log(`⏳ Retrying in ${delayMs / 1000} seconds...`);
            await delay(delayMs);
          } else {
            console.error('❌ All MongoDB connection attempts failed.');
            cached.promise = null;
            throw error;
          }
        }
      }
      throw new Error('Unreachable code');
    })();
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    throw new Error(`${DB_CONNECTION_FAILED}. ${error}`);
  }
}

export default dbConnect;
