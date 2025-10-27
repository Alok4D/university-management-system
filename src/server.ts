/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import mongoose from 'mongoose';
import config from './app/config';
import app from './app';
import { Server } from 'http';

let server: Server;

// 🌟 Main function to connect DB and start server
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('✅ Database connected successfully');

    server = app.listen(config.port, () => {
      console.log(`🚀 Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error('❌ Error starting server or connecting to DB:', error);
    process.exit(1);
  }
}

main();

// ⚡ Handle Unhandled Promise Rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('💀 Unhandled Rejection detected, shutting down...');
  console.error('Reason:', reason);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// ⚡ Handle Uncaught Exceptions
process.on('uncaughtException', (error) => {
  console.error('💀 Uncaught Exception detected, shutting down...');
  console.error('Error:', error);
  process.exit(1);
});

// ✅ Optional: for debugging undefined variables safely
// let x = 10;
// console.log(x);
