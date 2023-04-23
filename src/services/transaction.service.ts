import transactionInstance from 'src/config/transactionService.config';
import {
  ITransactionCreate,
  ITransactionResponse,
  ITransactionUpdate,
} from 'src/interfaces/Transaction.interface';
import {
  ICommonCreateResponse,
  ICommonDeleteResponse,
  IResponse,
  IResponsePaginated,
} from 'src/interfaces/Response.interface';

export const getTransactionsSSR = async (
  token: string
): Promise<IResponsePaginated<ITransactionResponse>> => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/transactions/api/`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `bearer ${token}`,
    },
  });
  return response.json();
};

export const getTransactions = async (
  pageNumber = 1,
  rowsPerPage = 10,
  orderField = undefined,
  sortType = undefined
): Promise<IResponsePaginated<ITransactionResponse>> => {
  const transactionList = await transactionInstance.get<IResponsePaginated<ITransactionResponse>>(
    `/`,
    { params: { pageNumber, rowsPerPage, orderField, sortType } }
  );

  return transactionList.data;
};

export const createTransaction = async (
  transaction: ITransactionCreate
): Promise<IResponse<ICommonCreateResponse>> => {
  const transactionCreated = await transactionInstance.post<IResponse<ICommonCreateResponse>>(
    '/',
    transaction
  );

  return transactionCreated.data;
};

export const updateTransaction = async (
  transaction: ITransactionUpdate
): Promise<IResponse<ITransactionUpdate>> => {
  const { uuid, ...rest } = transaction;
  const transactionUpdated = await transactionInstance.patch<IResponse<ITransactionUpdate>>(
    `/${uuid}`,
    rest
  );

  return transactionUpdated.data;
};

export const deleteTransaction = async (
  transactionId: string
): Promise<IResponse<ICommonDeleteResponse>> => {
  const transactionUpdated = await transactionInstance.delete<IResponse<ICommonDeleteResponse>>(
    `/${transactionId}`
  );

  return transactionUpdated.data;
};
