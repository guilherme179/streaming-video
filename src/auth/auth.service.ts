import { UserService } from 'src/user/user.service';  // Supondo que você tenha um serviço para gerenciar usuários
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';   // Entidade de usuário (com banco de dados)
import { IGoogleProfile, IUser } from './dto/auth-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,  // Serviço para interagir com o banco de dados
    private readonly jwtService: JwtService,  // Serviço de JWT
  ) {}

  // Método para salvar ou atualizar o usuário
  async saveOrUpdateUser(profile: IUser): Promise<User> {
    // Verifique se o usuário já existe no banco de dados
    let user = await this.userService.findOneByGoogleId(profile.googleId);
    if (!user) {
      // Se o usuário não existir, cria um novo
      user = await this.userService.create({
        googleId: profile.googleId,
        name: profile.name,
        email: profile.email,
        profilePicture: profile.profilePicture
      });
    } else {
      // Se o usuário já existir, só atualiza se houver mudanças nos dados
      let userUpdated = false;

      // Verificar se houve mudanças nos dados
      if (user.name !== profile.name) {
        user.name = profile.name;
        userUpdated = true;
      }

      if (user.email !== profile.email) {
        user.email = profile.email;
        userUpdated = true;
      }


      if (user.profilePicture !== profile.profilePicture) {
        user.profilePicture = profile.profilePicture;
        userUpdated = true;
      }

      // Só salva se houver mudanças
      if (userUpdated) {
        await this.userService.update(user.id, user);
      }

    }
 
    return user;
  }

  async validateGoogleUser(profile: IGoogleProfile) {
    // Aqui você pode salvar o usuário no banco de dados, por exemplo, e gerar um JWT
    const user = {
      name: profile.displayName || '',
      email: profile.emails[0].value,
      googleId: profile.id,
      profilePicture: profile?.photos[0].value,
    };
    return user;
  }
}