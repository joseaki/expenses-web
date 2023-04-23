import { IAccount } from 'src/interfaces/Account.interface';

export interface IAccountModal {
  onFinish?: (data: Omit<IAccount, 'uuid' | 'userId'>) => void | Promise<boolean>;
}
