import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { UsersService } from "src/users/users.service";
import { ExtractJwt, Strategy } from "passport-jwt";

export interface JwtPayload {
    sub: number; // user id
    email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET
    });
  }

  async validate(payload: JwtPayload) {
    //const user = await this.usersService.findByEmail(payload.email);
    const user = await this.usersService.findOne(payload.sub);
    if (!user) {
        throw new UnauthorizedException('Utilisateur non trouvé');
    }
    const { password, ...result } = user; // Exclure le mot de passe
    return result;
  }

  
}