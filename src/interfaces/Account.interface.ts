export interface IAccount {
  uuid: string;
  name: string;
  initialValue: number;
  currency: string;
  color: string;
  userId: string;
}

export type IAccountResponse = Omit<IAccount, 'userId'>;

export type IAccountUpdate = Omit<IAccount, 'currency' | 'userId'>;

export type IAccountCreate = Omit<IAccount, 'uuid' | 'userId'>;
