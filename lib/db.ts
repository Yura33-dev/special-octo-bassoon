import mongoose from 'mongoose';

import { config } from './config';

const connection: { isConnected?: number } = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(config.DB_URI);
    connection.isConnected = db.connections[0].readyState;
  } catch (e) {
    console.error('Error while connect to database:', e);
  }
}

export default dbConnect;
