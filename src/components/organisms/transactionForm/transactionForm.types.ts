import { FormInstance } from 'antd';
import { Ref } from 'react';
import { ITransactionCreate } from 'src/interfaces/Transaction.interface';

export interface ITransactionForm {
  onFinish?: (data: ITransactionCreate) => void;
  formRef?: Ref<FormInstance<ITransactionCreate>>;
  isLoading?: boolean;
}
