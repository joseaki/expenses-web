import { FormInstance } from 'antd';
import { Ref } from 'react';
import { IAccount, IAccountResponse } from 'src/interfaces/Account.interface';

export interface IAccountEditForm {
  onFinish?: (data: Omit<IAccount, 'uuid' | 'userId' | 'currency'>) => void;
  formRef?: Ref<FormInstance<Omit<IAccount, 'uuid' | 'userId' | 'currency'>>>;
  isLoading?: boolean;
  initialData?: IAccountResponse;
}
