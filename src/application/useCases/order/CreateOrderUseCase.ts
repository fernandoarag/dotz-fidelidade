import type { Order } from '../../../core/domain/entities/Order';
import type { IOrderRepository } from '../../../core/domain/repositories/IOrderRepository';
import type { ITransactionRepository } from '../../../core/domain/repositories/ITransactionRepository';

export class CreateOrderUseCase {
  constructor(
    private orderRepository: IOrderRepository,
    private transactionRepository: ITransactionRepository
  ) {}

  async execute(orderData: Omit<Order, 'id' | 'createdAt' | 'status'>): Promise<Order> {
    // Verificar se o usuário tem pontos suficientes
    const pointsBalance = await this.transactionRepository.getUserPointsBalance();

    if (pointsBalance < orderData.totalPoints) {
      throw new Error('Saldo de pontos insuficiente');
    }

    return this.orderRepository.createOrder(orderData);
  }
}
