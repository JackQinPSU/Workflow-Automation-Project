// Scoped Prisma client for auth feature — avoids redundant connections locally
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export default prisma;

