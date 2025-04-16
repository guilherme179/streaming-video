import { Module } from '@nestjs/common';
import { VideoModule } from './video/video.module';
import { S3Service } from './shared/s3.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    VideoModule, 
    AuthModule,
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
  ],
  controllers: [],
  providers: [S3Service],
})
export class AppModule {}
