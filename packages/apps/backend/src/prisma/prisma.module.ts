// src/prisma/prisma.module.ts
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';

@Global() // disponibile ovunque senza bisogno di importarlo ogni volta
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
