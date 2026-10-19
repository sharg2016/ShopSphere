import 'dotenv/config';
import dns from 'dns';

// Ensure DNS SRV queries for MongoDB Atlas (querySrv) resolve reliably across all local networks
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {
  // Ignore fallback if custom DNS setting is restricted
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import net from 'net';

async function isPortOpen(port: number, host: string): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(1000);
    socket.on('connect', () => {
      socket.destroy();
      resolve(true);
    });
    socket.on('error', () => {
      socket.destroy();
      resolve(false);
    });
    socket.on('timeout', () => {
      socket.destroy();
      resolve(false);
    });
    socket.connect(port, host);
  });
}

async function ensureDatabase() {
  const uri = process.env.MONGODB_URI;
  let isAtlasOk = false;
  if (uri && uri.includes('mongodb+srv')) {
    try {
      const { default: mongoose } = await import('mongoose');
      const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 3000 });
      await conn.disconnect();
      console.log('[MongoDB] ✅ Connected successfully to MongoDB Atlas.');
      isAtlasOk = true;
    } catch (err: any) {
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.error('[MongoDB] ❌ Atlas connection FAILED:', err.message);
      console.error('[MongoDB] ⚠️  Falling back to local/in-memory MongoDB.');
      console.error('[MongoDB] 👉 Fix: Check your MONGODB_URI in .env and');
      console.error('[MongoDB]    make sure your IP is whitelisted on Atlas.');
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/shopsphere';
    }
  }

  if (!isAtlasOk) {
    const isLocalRunning = await isPortOpen(27017, '127.0.0.1');
    if (!isLocalRunning) {
      console.log('[MongoMemoryServer] Local MongoDB daemon not found on port 27017. Starting in-memory MongoDB...');
      try {
        const { MongoMemoryServer } = await import('mongodb-memory-server');
        const mongod = await MongoMemoryServer.create({
          instance: { port: 27017, dbName: 'shopsphere' }
        });
        process.env.MONGODB_URI = mongod.getUri();
        console.log(`[MongoMemoryServer] In-memory MongoDB running at ${process.env.MONGODB_URI}`);
      } catch (err) {
        console.warn('[MongoMemoryServer] Fallback to standard URI:', err);
        process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/shopsphere';
      }
    } else {
      process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/shopsphere';
    }
  }

  // Ensure DB contains products automatically
  const activeUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/shopsphere';
  try {
    const { default: mongoose } = await import('mongoose');
    await mongoose.connect(activeUri, { serverSelectionTimeoutMS: 5000 });
    const db = mongoose.connection.db;
    const count = db ? await db.collection('products').countDocuments() : 0;
    if (count === 0) {
      console.log(`[AutoSeed] Database at ${activeUri} has 0 products. Auto-seeding 350 sample products...`);
      await mongoose.disconnect();
      const { populateProducts, seedDefaultUsers } = await import('./seed.js');
      await populateProducts(activeUri);
      await seedDefaultUsers(activeUri);
    } else {
      console.log(`[AutoSeed] Verified database at ${activeUri} contains ${count} products.`);
      await mongoose.disconnect();
      // Always ensure default users exist (in case DB was cleared or in-memory restarted)
      const { seedDefaultUsers } = await import('./seed.js');
      await seedDefaultUsers(activeUri);
    }
  } catch (err: any) {
    console.warn('[AutoSeed] Auto-seed check notice:', err.message);
  }
}

async function bootstrap() {
  await ensureDatabase();

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }));

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`[NestJS] Application running on http://localhost:${port}`);
}

await bootstrap();
