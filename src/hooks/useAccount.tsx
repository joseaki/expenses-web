import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from './useAuth';
import {
  createAccount,
  deleteAccount,
  getAccounts,
  updateAccount,
} from 'src/services/account.service';
import { IAccountCreate, IAccountResponse, IAccountUpdate } from 'src/interfaces/Account.interface';
import { IResponse } from 'src/interfaces/Response.interface';
import { notification } from 'antd';
import { useEffect } from 'react';

const useAccount = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [api, contextHolder] = notification.useNotification();

  const { data } = useQuery({
    queryKey: ['accounts', user?.uid],
    queryFn: () => getAccounts(user!.uid),
    enabled: !!user?.uid,
  });

  const createAccountMutation = useMutation({
    mutationFn: (account: IAccountCreate) => {
      return createAccount(account);
    },
    onMutate: (account) => {
      const optimisticAccount = { uuid: Math.floor(Math.random() * 10000).toString(), ...account };
      queryClient.setQueryData<IResponse<IAccountResponse[]>>(['accounts', user?.uid], (old) => ({
        data: [...(old?.data ?? []), optimisticAccount],
      }));
      return optimisticAccount;
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData<IResponse<IAccountResponse[]>>(['accounts', user?.uid], (old) => {
        return { data: old?.data.filter((account) => account.uuid !== context?.uuid) ?? [] };
      });
    },
    onSuccess: (result, variables, context) => {
      console.log(context?.uuid);
      queryClient.setQueryData<IResponse<IAccountResponse[]>>(['accounts', user?.uid], (old) => ({
        data:
          old?.data.map((account) =>
            account.uuid === context?.uuid ? { ...account, uuid: result.data.id } : account
          ) ?? [],
      }));
    },
  });

  const updateAccountMutation = useMutation({
    mutationFn: (account: IAccountUpdate) => {
      return updateAccount(account);
    },
    onMutate: (account) => {
      let previousAccount: IAccountResponse = { ...account, currency: '' };
      queryClient.setQueryData<IResponse<IAccountResponse[]>>(['accounts', user?.uid], (old) => ({
        data:
          old?.data.map((oldAccount) => {
            if (oldAccount.uuid === account.uuid) {
              previousAccount = { ...oldAccount };
              return { ...oldAccount, ...account };
            }
            return oldAccount;
          }) ?? [],
      }));
      return previousAccount;
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData<IResponse<IAccountResponse[]>>(['accounts', user?.uid], (old) => {
        return {
          data:
            old?.data.map((account) => (account.uuid === context?.uuid ? context : account)) ?? [],
        };
      });
    },
    onSuccess: (result, variables, context) => {
      queryClient.setQueryData<IResponse<IAccountResponse[]>>(['accounts', user?.uid], (old) => ({
        data:
          old?.data.map((account) =>
            account.uuid === context?.uuid ? { ...account, ...result.data } : account
          ) ?? [],
      }));
    },
  });

  const deleteAccountMutation = useMutation({
    mutationFn: (accountId: string) => {
      return deleteAccount(accountId);
    },
    onMutate: (accountId) => {
      let previousAccount: IAccountResponse | undefined = undefined;
      queryClient.setQueryData<IResponse<IAccountResponse[]>>(['accounts', user?.uid], (old) => ({
        data:
          old?.data.filter((oldAccount) => {
            if (oldAccount.uuid === accountId) {
              previousAccount = { ...oldAccount };
              return false;
            }
            return true;
          }) ?? [],
      }));
      return previousAccount;
    },
    onError: (error, variables, context: IAccountResponse | undefined) => {
      queryClient.setQueryData<IResponse<IAccountResponse[]>>(['accounts', user?.uid], (old) => {
        return {
          data: [...(old?.data ?? []), context!],
        };
      });
    },
  });

  useEffect(() => {
    if (createAccountMutation.status === 'error') {
      api.error({
        message: 'We could not create the account',
      });
    }
  }, [createAccountMutation.status, api]);
  useEffect(() => {
    if (updateAccountMutation.status === 'error') {
      api.error({
        message: 'We could not updated the account',
      });
    }
  }, [updateAccountMutation.status, api]);
  useEffect(() => {
    if (deleteAccountMutation.status === 'error') {
      api.error({
        message: 'We could not delete the account',
      });
    }
  }, [deleteAccountMutation.status, api]);

  return {
    contextHolder,
    accounts: data?.data ?? [],
    createAccountMutation,
    updateAccountMutation,
    deleteAccountMutation,
  };
};

export default useAccount;
