import type { Address } from '../../core/domain/entities/Address';
import type { User } from '../../core/domain/entities/User';
import type { IUserRepository } from '../../core/domain/repositories/IUserRepository';
import { AxiosHttpClient } from '../http/AxiosHttpClient';

export class UserRepository implements IUserRepository {
  private http = AxiosHttpClient.getInstance();

  async register(user: Omit<User, 'id' | 'pointsBalance' | 'createdAt'>): Promise<User> {
    const response = await this.http.post<User>('/users', user);
    return response.data;
  }

  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const response = await this.http.post<{ user: User; token: string }>('/auth/login', {
      email,
      password,
    });

    // Salvar token no localStorage
    localStorage.setItem('token', response.data.token);

    return response.data;
  }

  async getProfile(): Promise<User> {
    const response = await this.http.get<User>('/users/profile');
    return response.data;
  }

  async updateProfile(user: Partial<User>): Promise<User> {
    const response = await this.http.put<User>('/users/profile', user);
    return response.data;
  }

  async addAddress(address: Omit<Address, 'id'>): Promise<Address> {
    const response = await this.http.post<Address>('/users/addresses', address);
    return response.data;
  }

  async getAddresses(): Promise<Address[]> {
    const response = await this.http.get<Address[]>('/users/addresses');
    return response.data;
  }

  async updateAddress(address: Address): Promise<Address> {
    const response = await this.http.put<Address>(`/users/addresses/${address.id}`, address);
    return response.data;
  }

  async deleteAddress(addressId: string): Promise<void> {
    await this.http.delete(`/users/addresses/${addressId}`);
  }
}
