import { PrismaClient } from '../../generated/client/client.js'; // Import from your generated folder
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

// 1. Create the native PG pool
const pool = new pg.Pool({ connectionString });

// 2. Connect the Prisma Adapter to the pool
const adapter = new PrismaPg(pool);

// 3. Instantiate the client with the adapter
const prisma = new PrismaClient({ adapter });

export default prisma;