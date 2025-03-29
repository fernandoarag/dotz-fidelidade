import type { Address } from '../entities/Address';
import type { User } from '../entities/User';

export interface IUserRepository {
  register(user: Omit<User, 'id' | 'pointsBalance' | 'createdAt'>): Promise<User>;
  login(email: string, password: string): Promise<{ user: User; token: string }>;
  getProfile(): Promise<User>;
  updateProfile(user: Partial<User>): Promise<User>;
  addAddress(address: Omit<Address, 'id'>): Promise<Address>;
  getAddresses(): Promise<Address[]>;
  updateAddress(address: Address): Promise<Address>;
  deleteAddress(addressId: string): Promise<void>;
}

// src/core/domain/repositories/IProductRepository.ts

// src/core/domain/repositories/IOrderRepository.ts
