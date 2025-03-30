import type { Address } from '@core/domain/entities/Address';
import type { User } from '@core/domain/entities/User';
import type { IUserRepository } from '@core/domain/repositories/IUserRepository';
import { AxiosHttpClient } from '@infrastructure/http/AxiosHttpClient';

export class UserRepository implements IUserRepository {
  private http = AxiosHttpClient.getInstance();

  /**
   * Método para normalizar datas em um objeto
   */
  private normalizeDates<T>(obj: T): T {
    // Caso base: se for null, undefined ou não-objeto
    if (obj === null || obj === undefined || typeof obj !== 'object') {
      return obj;
    }

    // Lidar com arrays
    if (Array.isArray(obj)) {
      return obj.map(item => this.normalizeDates(item)) as unknown as T;
    }

    // Criar uma cópia do objeto para evitar modificar o original
    const result = {} as Record<string, any>;

    // Copiar cada propriedade, normalizando valores de objeto/data
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = (obj as any)[key];

        // Converter propriedades de data
        if (key === 'createdAt' && typeof value === 'string') {
          result[key] = new Date(value);
        }
        // Processar recursivamente objetos aninhados
        else if (value !== null && typeof value === 'object') {
          result[key] = this.normalizeDates(value);
        }
        // Copiar valores primitivos diretamente
        else {
          result[key] = value;
        }
      }
    }

    return result as unknown as T;
  }

  async register(user: Omit<User, 'id' | 'pointsBalance' | 'createdAt'>): Promise<User> {
    try {
      const response = await this.http.post<User>('/auth/register', user);
      return this.normalizeDates(response.data);
    } catch (error) {
      console.error('Error registering user:', error);
      throw error instanceof Error
        ? error
        : new Error('Falha ao registrar usuário. Por favor, tente novamente.');
    }
  }

  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    try {
      const response = await this.http.post<{ user: User; token: string }>('/auth/login', {
        email,
        password,
      });

      // Salvar token no localStorage
      localStorage.setItem('token', response.data.token);

      return {
        user: this.normalizeDates(response.data.user),
        token: response.data.token,
      };
    } catch (error) {
      console.error('Error logging in:', error);
      throw error instanceof Error
        ? error
        : new Error('Credenciais inválidas. Por favor, verifique seu e-mail e senha.');
    }
  }

  async getProfile(): Promise<User> {
    try {
      const response = await this.http.get<User>('/users/profile');
      return this.normalizeDates(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error instanceof Error
        ? error
        : new Error('Falha ao carregar perfil. Por favor, tente novamente.');
    }
  }

  async updateProfile(user: Partial<User>): Promise<User> {
    try {
      const response = await this.http.put<User>('/users/profile', user);
      return this.normalizeDates(response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error instanceof Error
        ? error
        : new Error('Falha ao atualizar perfil. Por favor, tente novamente.');
    }
  }

  async addAddress(address: Omit<Address, 'id'>): Promise<Address> {
    try {
      const response = await this.http.post<Address>('/users/addresses', address);
      return this.normalizeDates(response.data);
    } catch (error) {
      console.error('Error adding address:', error);
      throw error instanceof Error
        ? error
        : new Error('Falha ao adicionar endereço. Por favor, tente novamente.');
    }
  }

  async getAddresses(): Promise<Address[]> {
    try {
      const response = await this.http.get<Address[]>('/users/addresses');
      return this.normalizeDates(response.data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
      throw error instanceof Error
        ? error
        : new Error('Falha ao carregar endereços. Por favor, tente novamente.');
    }
  }

  async updateAddress(address: Address): Promise<Address> {
    try {
      const response = await this.http.put<Address>(`/users/addresses/${address.id}`, address);
      return this.normalizeDates(response.data);
    } catch (error) {
      console.error('Error updating address:', error);
      throw error instanceof Error
        ? error
        : new Error('Falha ao atualizar endereço. Por favor, tente novamente.');
    }
  }

  async deleteAddress(addressId: string): Promise<void> {
    try {
      await this.http.delete(`/users/addresses/${addressId}`);
    } catch (error) {
      console.error('Error deleting address:', error);
      throw error instanceof Error
        ? error
        : new Error('Falha ao excluir endereço. Por favor, tente novamente.');
    }
  }
}
