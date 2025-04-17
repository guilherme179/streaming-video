import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './google-auth.guard';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt'; 
import { Response } from 'express';
import { sign } from 'jsonwebtoken';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  // Rota para iniciar o login com Google
  @Get('google')
  @UseGuards(GoogleAuthGuard) // Guarda de autenticação do Google
  async googleAuth() {
  }

  // Rota para o callback após a autenticação do Google
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req: any, @Res() res: Response) {
    // Aqui, o `req.user` contém os dados do usuário autenticado do Google
    const user = req.user;

    // Salve ou atualize o usuário no banco de dados (caso necessário)
    const savedUser = await this.authService.saveOrUpdateUser(user);

    // Gerar o JWT para o usuário
    const payload = { name: savedUser.name, sub: savedUser.id, email: savedUser.email, profilePicture: savedUser.profilePicture }; // Payload do JWT

    // Use a chave secreta definida no JwtModule para assinar o token
    const secret = process.env.JWT_SECRET != null ? process.env.JWT_SECRET : '';
    console.log(secret)
    const token = sign(payload, secret, { algorithm: 'HS256' }); // Chave secreta configurada no .env

    // Retorne o token JWT para o frontend (ou redirecione para uma página protegida)
    return res.json({ access_token: token });
  }
}
