import { IAccount, IAccountResponse } from 'src/interfaces/Account.interface';

export interface IAccountEditModal {
  isOpen?: boolean;
  initialData?: IAccountResponse;
  onFinish?: (data?: Omit<IAccount, 'userId' | 'currency'>) => void | Promise<boolean>;
}
