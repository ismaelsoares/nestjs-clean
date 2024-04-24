import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log: ["query", "error", "warn"],
    });
  }
  onModuleInit() {
    console.log(`Banco conectado!`);
    return this.$connect();
  }
  onModuleDestroy() {
    console.log(`Banco desconectado!`);
    return this.$disconnect();
  }
}
