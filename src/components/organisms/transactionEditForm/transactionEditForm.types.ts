import { FormInstance } from 'antd';
import { Ref } from 'react';
import { ITransaction, ITransactionResponse } from 'src/interfaces/Transaction.interface';

export interface ITransactionEditForm {
  onFinish?: (data: Omit<ITransaction, 'uuid'>) => void;
  formRef?: Ref<FormInstance<Omit<ITransaction, 'uuid'>>>;
  isLoading?: boolean;
  initialData?: ITransactionResponse;
}
