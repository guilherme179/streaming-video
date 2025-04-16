import { VideoController } from './video.controller';
import { S3Service } from 'src/shared/s3.service';
import { VideoService } from './video.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [VideoController],
  providers: [VideoService, S3Service]
})
export class VideoModule {}
