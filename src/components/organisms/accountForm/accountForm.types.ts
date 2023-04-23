import { FormInstance } from 'antd';
import { Ref } from 'react';
import { IAccount } from 'src/interfaces/Account.interface';

export interface IAccountForm {
  onFinish?: (data: Omit<IAccount, 'uuid' | 'userId'>) => void;
  formRef?: Ref<FormInstance<Omit<IAccount, 'uuid' | 'userId'>>>;
  isLoading?: boolean;
}
