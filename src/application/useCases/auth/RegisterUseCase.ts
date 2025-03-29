import type { User } from '../../../core/domain/entities/User';
import type { IUserRepository } from '../../../core/domain/repositories/IUserRepository';

export class RegisterUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userData: {
    name: string;
    email: string;
    password: string;
    phone: string;
  }): Promise<User> {
    return this.userRepository.register(userData);
  }
}
