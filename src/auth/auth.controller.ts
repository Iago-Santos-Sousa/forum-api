import { Body, Controller, Inject, Post, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Prisma } from "@prisma/client";

@Controller("auth")
export class AuthController {
  // Maneira 1 de injetar a dependência
  constructor(private readonly authService: AuthService) {}

  // Maneira 2 de injetar a dependência
  // @Inject()
  // private readonly authService: AuthService;

  @Post("signin")
  // @HttpCode(200) code: 200
  @HttpCode(HttpStatus.OK) // code: 200
  signin(@Body() body: Prisma.UserCreateInput) {
    return this.authService.signin(body);
  }
}
