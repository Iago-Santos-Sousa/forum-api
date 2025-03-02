import { Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/database/prisma.service";

@Injectable()
export class AuthService {
  private readonly prisma: PrismaService;

  @Inject()
  private readonly jwtService: JwtService;

  async signin(params: Prisma.UserCreateInput): Promise<{ access_token: string }> {
    const user = await this.prisma.user.findUnique({ where: { email: params.email } });
    if (!user) throw new NotFoundException("User not found!");
    const passwordMatch = await bcrypt.compare(params.password, user.password);
    if (!passwordMatch) throw new UnauthorizedException("Invalid credential!");
    const payload = { sub: user.id, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
