import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity()
@Unique(['googleId']) // Garantir que cada Google ID seja único
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  googleId: string; // ID único fornecido pelo Google

  @Column()
  name: string;

  @Column()
  email: string;

  // Outros campos que você pode querer armazenar, como foto de perfil, etc.
  @Column({ nullable: true })
  profilePicture?: string; 
}
