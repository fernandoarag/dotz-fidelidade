export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password?: string; // Não retornado da API
  pointsBalance: number;

  createdAt: Date;
}
