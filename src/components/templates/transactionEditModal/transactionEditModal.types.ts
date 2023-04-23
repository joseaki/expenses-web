import { ITransaction, ITransactionResponse } from 'src/interfaces/Transaction.interface';

export interface ITransactionEditModal {
  isOpen?: boolean;
  initialData?: ITransactionResponse;
  onFinish?: (data?: Omit<ITransaction, 'userId' | ''>) => void | Promise<boolean>;
}
