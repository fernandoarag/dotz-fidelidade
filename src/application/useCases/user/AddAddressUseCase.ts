import type { Address } from '../../../core/domain/entities/Address';
import type { IUserRepository } from '../../../core/domain/repositories/IUserRepository';

export class AddAddressUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(addressData: Omit<Address, 'id'>): Promise<Address> {
    return this.userRepository.addAddress(addressData);
  }
}
