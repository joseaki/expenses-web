export interface IAccount {
  uuid: string;
  name: string;
  initialValue: number;
  currency: string;
  color: string;
  userId: string;
}

export interface IAccountResponse extends IAccount {
  key: React.Key;
}

export type IAccountUpdate = Omit<IAccount, 'currency' | 'userId'>;

export type IAccountCreate = Omit<IAccount, 'uuid' | 'userId'>;
