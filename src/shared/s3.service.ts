import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';
import { randomUUID } from 'node:crypto';

config();  // Carregar variáveis de ambiente do arquivo .env

@Injectable()
export class S3Service {
    private s3: S3Client;

  constructor() {
    // Verifique se as variáveis de ambiente estão definidas
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    const region = process.env.AWS_REGION;
    const bucketName = process.env.AWS_BUCKET_NAME;

    if (!accessKeyId || !secretAccessKey || !region || !bucketName) {
      throw new Error('As credenciais AWS ou o nome do bucket não estão configurados corretamente.');
    }

    this.s3 = new S3Client({
        region,
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
    });
  }

  // Função para upload de vídeo no S3
  async uploadFile(file: Express.Multer.File) {
    const uuid = randomUUID();
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME!, // Adicionando `!` para garantir que não seja undefined
      Key: `videos/${uuid}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
        const command = new PutObjectCommand(params); // Usando o comando para enviar o arquivo
        const data = await this.s3.send(command);  // Envia o comando
        
        // Construindo a URL do arquivo manualmente
        const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${params.Key}`;
        return { url: fileUrl };  // Retorna a URL pública
    } catch (error) {
        throw new Error('Erro ao enviar o vídeo para o S3: ' + error.message);
    }
  }

  // Função para recuperar a URL de um vídeo
  getFileUrl(fileKey: string): string {
    return `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${fileKey}`;
  }
}
