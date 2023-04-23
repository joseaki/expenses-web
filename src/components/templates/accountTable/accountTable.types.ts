import { TableProps } from 'antd';
import { IAccountResponse } from 'src/interfaces/Account.interface';

export interface IAccountTable {
  accounts?: IAccountResponse[];
  onChange?: TableProps<IAccountResponse>['onChange'];
  onDelete?: (response: IAccountResponse) => void;
  onEdit?: (response: IAccountResponse) => void;
}
