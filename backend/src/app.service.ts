import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
