import { UserService } from 'src/user/user.service';  // Supondo que você tenha um serviço para gerenciar usuários
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';   // Entidade de usuário (com banco de dados)

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,  // Serviço para interagir com o banco de dados
    private readonly jwtService: JwtService,  // Serviço de JWT
  ) {}

  // Método para salvar ou atualizar o usuário
  async saveOrUpdateUser(profile: any): Promise<User> {
    // Verifique se o usuário já existe no banco de dados
    let user = await this.userService.findOneByGoogleId(profile.id);
    if (!user) {
      // Se o usuário não existir, cria um novo
      user = await this.userService.create({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        // Outros campos necessários...
      });
    } else {
      // Se o usuário já existir, só atualiza se houver mudanças nos dados
      let userUpdated = false;

      // Verificar se houve mudanças nos dados
      if (user.name !== profile.displayName) {
        user.name = profile.displayName;
        userUpdated = true;
      }

      if (user.email !== profile.emails[0].value) {
        user.email = profile.emails[0].value;
        userUpdated = true;
      }

      // Só salva se houver mudanças
      if (userUpdated) {
        user = await this.userService.update(user.id, user);
      }
    }

    return user;
  }

  async validateGoogleUser(profile: any) {
    // Aqui você pode salvar o usuário no banco de dados, por exemplo, e gerar um JWT
    const user = {
      id: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value,
    };
    return user;
  }
}