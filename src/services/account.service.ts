import accountInstance from 'src/config/accountService.config';
import { IAccountResponse } from 'src/interfaces/AccountListResponse';
import { IResponseList } from 'src/interfaces/Response.interface';

export const getAccounts = async (userId: string) => {
  const accountList = await accountInstance.get<IResponseList<IAccountResponse>>(
    `/account/${userId}`
  );

  return accountList.data;
};
