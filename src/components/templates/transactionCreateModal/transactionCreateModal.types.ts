import { ITransactionCreate } from 'src/interfaces/Transaction.interface';

export interface ITransactionModal {
  onFinish?: (data: ITransactionCreate) => void | Promise<boolean>;
}
