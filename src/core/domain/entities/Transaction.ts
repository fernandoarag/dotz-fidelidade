export interface Transaction {
  id: string;
  userId: string;
  type: 'EARN' | 'REDEEM';
  points: number;
  description: string;
  createdAt: Date;
}
