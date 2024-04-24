import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { hash } from "bcryptjs";

@Controller("/accounts")
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201) //Forçar o código de sucesso seja 201
  async handle(@Body() body: any) {
    console.log(body);
    const { name, email, password } = body;

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithSameEmail) {
      throw new ConflictException(
        "User with same e-mail address already exists "
      );
    }

    const hashPassword = await hash(password, 8);

    await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });
  }
}
