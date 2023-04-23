import { TableProps } from 'antd';
import { ITransactionResponse } from 'src/interfaces/Transaction.interface';

export interface ITransactionTable {
  transactions?: ITransactionResponse[];
  total?: number;
  onChange?: TableProps<ITransactionResponse>['onChange'];
  onDelete?: (response: ITransactionResponse) => void;
  onEdit?: (response: ITransactionResponse) => void;
}
