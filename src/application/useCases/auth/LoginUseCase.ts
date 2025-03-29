import type { User } from '../../../core/domain/entities/User';
import type { IUserRepository } from '../../../core/domain/repositories/IUserRepository';

export class LoginUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(email: string, password: string): Promise<{ user: User; token: string }> {
    return this.userRepository.login(email, password);
  }
}
