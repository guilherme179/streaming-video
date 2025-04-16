import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './google-auth.guard';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt'; 

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
    const payload = { username: savedUser.name, sub: savedUser.id }; // Payload do JWT
    const jwtToken = this.jwtService.sign(payload);

    // Retorne o token JWT para o frontend (ou redirecione para uma página protegida)
    return res.json({ access_token: jwtToken });
  }
}
