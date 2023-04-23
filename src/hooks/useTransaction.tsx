import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useAuth } from './useAuth';
import {
  createTransaction,
  deleteTransaction,
  getTransactions,
  updateTransaction,
} from 'src/services/transaction.service';
import {
  ITransactionCreate,
  ITransactionResponse,
  ITransactionUpdate,
} from 'src/interfaces/Transaction.interface';
import { IResponsePaginated } from 'src/interfaces/Response.interface';
import { notification } from 'antd';
import { useEffect } from 'react';

const useTransaction = (page = 1) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [api, contextHolder] = notification.useNotification();

  const { data } = useQuery({
    queryKey: ['transactions', user?.uid, page],
    queryFn: () => getTransactions(page),
    enabled: !!user?.uid,
  });

  const createTransactionMutation = useMutation({
    mutationFn: (transaction: ITransactionCreate) => {
      return createTransaction(transaction);
    },
    onMutate: (transaction) => {
      const optimisticTransaction: ITransactionResponse = {
        uuid: Math.floor(Math.random() * 10000).toString(),
        ...transaction,
      };
      const data = queryClient.getQueriesData<IResponsePaginated<ITransactionResponse>>([
        'transactions',
        user?.uid,
      ]);

      let pageToInsert = 1;
      let indexToInsert = -1;

      for (const [queryKey, value] of data) {
        for (let idx = 0; idx < (value?.data.items ?? []).length; idx++) {
          const item = value!.data.items[idx];
          if (dayjs(item.dateTime).isBefore(dayjs(transaction.dateTime))) {
            pageToInsert = queryKey[2] as number;
            indexToInsert = idx;
            break;
          }
        }
        if (indexToInsert < 0) indexToInsert = value?.data.items.length ?? 0;
      }

      queryClient.setQueryData<IResponsePaginated<ITransactionResponse>>(
        ['transactions', user?.uid, pageToInsert],
        (old) => {
          const newItems = old?.data.items ?? [];
          newItems.splice(indexToInsert, 0, optimisticTransaction);
          return {
            data: {
              page: old?.data.page ?? 1,
              count: old?.data.count ? old?.data.count + 1 : 1,
              items: newItems,
            },
          };
        }
      );
      return { optimisticTransaction, pageToInsert, indexToInsert };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData<IResponsePaginated<ITransactionResponse>>(
        ['transactions', user?.uid, context!.pageToInsert],
        (old) => {
          return {
            data: {
              page: old?.data.page ?? 1,
              count: old?.data.count ? old?.data.count - 1 : 1,
              items:
                old?.data.items.filter(
                  (transaction) => transaction.uuid !== context?.optimisticTransaction.uuid
                ) ?? [],
            },
          };
        }
      );
    },
    onSuccess: (result, variables, context) => {
      queryClient.setQueryData<IResponsePaginated<ITransactionResponse>>(
        ['transactions', user?.uid, context?.pageToInsert],
        (old) => {
          return {
            data: {
              page: old?.data.page ?? 1,
              count: old?.data.count ?? 1,
              items:
                old?.data.items.map((transaction) =>
                  transaction.uuid === context?.optimisticTransaction.uuid
                    ? { ...transaction, uuid: result.data.id }
                    : transaction
                ) ?? [],
            },
          };
        }
      );
    },
  });

  const updateTransactionMutation = useMutation({
    mutationFn: (transaction: ITransactionUpdate) => {
      return updateTransaction(transaction);
    },
    onMutate: (transaction) => {
      let previousTransaction: ITransactionResponse = { ...transaction };
      queryClient.setQueryData<IResponsePaginated<ITransactionResponse>>(
        ['transactions', user?.uid, page],
        (old) => ({
          data: {
            page: old?.data.page ?? 1,
            count: old?.data.count ? old?.data.count + 1 : 1,
            items:
              old?.data.items.map((oldTransaction) => {
                if (oldTransaction.uuid === transaction.uuid) {
                  previousTransaction = { ...oldTransaction };
                  return { ...oldTransaction, ...transaction };
                }
                return oldTransaction;
              }) ?? [],
          },
        })
      );
      return previousTransaction;
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData<IResponsePaginated<ITransactionResponse>>(
        ['transactions', user?.uid, page],
        (old) => {
          return {
            data: {
              page: old?.data.page ?? 1,
              count: old?.data.count ? old?.data.count - 1 : 1,
              items:
                old?.data.items.map((transaction) =>
                  transaction.uuid === context?.uuid ? context : transaction
                ) ?? [],
            },
          };
        }
      );
    },
    onSuccess: (result, variables, context) => {
      queryClient.setQueryData<IResponsePaginated<ITransactionResponse>>(
        ['transactions', user?.uid, page],
        (old) => ({
          data: {
            page: old?.data.page ?? 1,
            count: old?.data.count ?? 1,
            items:
              old?.data.items.map((transaction) =>
                transaction.uuid === context?.uuid
                  ? { ...transaction, ...result.data }
                  : transaction
              ) ?? [],
          },
        })
      );
    },
  });

  const deleteTransactionMutation = useMutation({
    mutationFn: (transactionId: string) => {
      return deleteTransaction(transactionId);
    },
    onMutate: (transactionId) => {
      let previousTransaction: ITransactionResponse | undefined = undefined;
      queryClient.setQueryData<IResponsePaginated<ITransactionResponse>>(
        ['transactions', user?.uid, page],
        (old) => ({
          data: {
            page: old?.data.page ?? 1,
            count: old?.data.count ? old?.data.count - 1 : 0,
            items:
              old?.data.items.filter((oldTransaction) => {
                if (oldTransaction.uuid === transactionId) {
                  previousTransaction = { ...oldTransaction };
                  return false;
                }
                return true;
              }) ?? [],
          },
        })
      );
      return previousTransaction;
    },
    onError: (error, variables, context: ITransactionResponse | undefined) => {
      queryClient.setQueryData<IResponsePaginated<ITransactionResponse>>(
        ['transactions', user?.uid, page],
        (old) => {
          return {
            data: {
              page: old?.data.page ?? 1,
              count: old?.data.count ? old?.data.count + 1 : 1,
              items: [...(old?.data.items ?? []), context!],
            },
          };
        }
      );
    },
  });

  useEffect(() => {
    if (createTransactionMutation.status === 'error') {
      api.error({
        message: 'We could not create the transaction',
      });
    }
  }, [createTransactionMutation.status, api]);
  useEffect(() => {
    if (updateTransactionMutation.status === 'error') {
      api.error({
        message: 'We could not updated the transaction',
      });
    }
  }, [updateTransactionMutation.status, api]);
  useEffect(() => {
    if (deleteTransactionMutation.status === 'error') {
      api.error({
        message: 'We could not delete the transaction',
      });
    }
  }, [deleteTransactionMutation.status, api]);

  return {
    contextHolder,
    transactions: data?.data ?? { count: 0, page: 1, items: [] },
    createTransactionMutation,
    updateTransactionMutation,
    deleteTransactionMutation,
  };
};

export default useTransaction;
