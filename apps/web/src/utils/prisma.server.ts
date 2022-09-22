import { PrismaClient } from '@prisma/client';

// eslint-disable-next-line import/no-mutable-exports
let prisma: PrismaClient;

declare global {
  // eslint-disable-next-line max-len
  // eslint-disable-next-line vars-on-top, no-var, @typescript-eslint/naming-convention, no-underscore-dangle
  var __db: PrismaClient | undefined;
}

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
  prisma.$connect();
} else {
  // eslint-disable-next-line
  if (!global.__db) {
    // eslint-disable-next-line
    global.__db = new PrismaClient();
    // eslint-disable-next-line
    global.__db.$connect();
  }
  // eslint-disable-next-line
    prisma = global.__db;
}

export { prisma };
