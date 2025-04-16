import { Controller, Post, Get, Param, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from 'src/shared/s3.service'; 

@Controller('videos')
export class VideoController {
  constructor(private readonly s3Service: S3Service) {}

  // Endpoint para upload de vídeo
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadVideo(@UploadedFile() file: Express.Multer.File) {
    const uploadedFile = await this.s3Service.uploadFile(file);
    return { url: uploadedFile.url };
  }

  // Endpoint para acessar um vídeo
  @Get(':videoKey')
  getVideo(@Param('videoKey') videoKey: string) {
    const videoUrl = this.s3Service.getFileUrl(videoKey);
    return { videoUrl };
  }
}
