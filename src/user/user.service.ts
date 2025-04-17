import { InjectRepository } from '@nestjs/typeorm';
import { IUser } from 'src/auth/dto/auth-user.dto';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';  // Supondo que você tenha uma entidade User configurada

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Encontrar um usuário pelo ID do Google
  async findOneByGoogleId(googleId: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { googleId } });
  }

  // Criar um novo usuário
  async create(userData: any): Promise<User> {
    const user = this.userRepository.create(userData);
    const result = await this.userRepository.save(user);  // `result` já é um único usuário

    // Se result for um array, retorna o primeiro item
    return Array.isArray(result) ? result[0] : result;
  }


  // Atualizar um usuário
  async update(id: any, userData: any): Promise<User | null> {
    await this.userRepository.update(id, userData);
    const result = this.userRepository.findOne(id);
    return result
  }
}
