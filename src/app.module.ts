import { Module } from '@nestjs/common';
import { VideoModule } from './video/video.module';
import { S3Service } from './shared/s3.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,  // Lê a variável de ambiente DB_HOST
      port: parseInt(process.env.DB_PORT || '5432', 10),  // Lê a variável DB_PORT e converte para número
      username: process.env.DB_USERNAME,  // Lê a variável DB_USERNAME
      password: process.env.DB_PASSWORD,  // Lê a variável DB_PASSWORD
      database: process.env.DB_DATABASE,  // Lê a variável DB_DATABASE
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Localização das entidades
      synchronize: true,  // Cuidado com isso em produção
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecret',  // Aqui você deve definir a chave secreta
      signOptions: { expiresIn: '6h', algorithm: 'RS256' },  // Defina o tempo de expiração do JWT, por exemplo, 1 hora
    }),
    VideoModule, 
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [S3Service],
})
export class AppModule {}