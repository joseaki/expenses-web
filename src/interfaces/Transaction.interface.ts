export interface ITransaction {
  uuid: string;
  type: TransactionType;
  amount: number;
  currency: string;
  accountId: string;
  userId: string;
  dateTime: string;
  paymentMethod: PaymentMethod;
  description?: string;
}

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export enum PaymentMethod {
  CASH = 'CASH',
  CREDIT_CART = 'CREDIT_CART',
  DEBIT_CART = 'DEBIT_CART',
  TRANSFER = 'TRANSFER',
}

export type ITransactionResponse = Omit<ITransaction, 'userId'>;

export type ITransactionUpdate = Omit<ITransaction, 'userId'>;

export type ITransactionCreate = Omit<ITransaction, 'uuid' | 'userId'>;
