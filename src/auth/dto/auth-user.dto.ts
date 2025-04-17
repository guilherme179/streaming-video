export class IUser {
    id?: number;
    googleId: string;
    name: string;
    email: string;
    profilePicture?: string; 
}

export interface IGoogleProfile {
    id: string;
    displayName: string | undefined;  // O nome pode ser undefined se não for fornecido
    emails: { value: string; verified: boolean }[];
    photos: { value: string }[];  // Array com objetos que têm a URL da foto
    provider: string;
    _raw: string;  // String JSON bruta recebida
    _json: {
      sub: string;
      picture: string;  // URL da foto do perfil
      email: string;
      email_verified: boolean;
    };
}
  