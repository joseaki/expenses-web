import accountInstance from 'src/config/accountService.config';
import { IAccountCreate, IAccountResponse, IAccountUpdate } from 'src/interfaces/Account.interface';
import {
  ICommonCreateResponse,
  ICommonDeleteResponse,
  IResponse,
  IResponseList,
} from 'src/interfaces/Response.interface';

export const getAccountsSSR = async (
  userId: string,
  token: string
): Promise<IResponseList<IAccountResponse>> => {
  const accountList = await accountInstance.get<IResponseList<IAccountResponse>>(
    `/account/${userId}`,
    {
      headers: {
        Authorization: `bearer ${token}`,
      },
    }
  );

  return accountList.data;
};

export const getAccounts = async (
  userId: string,
  token?: string
): Promise<IResponseList<IAccountResponse>> => {
  const accountList = await accountInstance.get<IResponseList<IAccountResponse>>(
    `/account/${userId}`
  );

  return accountList.data;
};

export const createAccount = async (
  account: IAccountCreate
): Promise<IResponse<ICommonCreateResponse>> => {
  const accountCreated = await accountInstance.post<IResponse<ICommonCreateResponse>>(
    '/account',
    account
  );

  return accountCreated.data;
};

export const updateAccount = async (
  account: IAccountUpdate
): Promise<IResponse<Omit<IAccountUpdate, 'uuid'>>> => {
  const { uuid, ...rest } = account;
  const accountUpdated = await accountInstance.patch<IResponse<Omit<IAccountUpdate, 'uuid'>>>(
    `/account/${uuid}`,
    rest
  );

  return accountUpdated.data;
};

export const deleteAccount = async (
  accountId: string
): Promise<IResponse<ICommonDeleteResponse>> => {
  const accountUpdated = await accountInstance.delete<IResponse<ICommonDeleteResponse>>(
    `/account/${accountId}`
  );

  return accountUpdated.data;
};
