import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { Modal, notification } from 'antd';
import type { TableProps } from 'antd/es/table';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import useAccount from 'src/hooks/useAccount';
import { Layout } from 'src/components/templates/layout/layout';
import {
  createAccount,
  deleteAccount,
  getAccountsSSR,
  updateAccount,
} from 'src/services/account.service';
import { IAccount, IAccountResponse, IAccountUpdate } from 'src/interfaces/Account.interface';
import AccountModal from 'src/components/templates/accountCreateModal/accountCreateModal';
import AccountTable from 'src/components/templates/accountTable/accountTable';
import { getTokenFormRequest } from 'src/lib/token.utils';
import AccountEditModal from 'src/components/templates/accountEditModal/accountEditModal';
import { ExclamationCircleFilled } from '@ant-design/icons';

const { confirm } = Modal;

const showDeleteConfirm = ({ onOk, onCancel }: { onOk: () => void; onCancel?: () => void }) => {
  confirm({
    title: 'Are you sure you want to delete this account?',
    icon: <ExclamationCircleFilled />,
    content: 'By deleting this account you will delete all its transactions',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk: onOk,
    onCancel: onCancel,
  });
};

const Account = () => {
  const [editAccount, setEditAccount] = useState<IAccountResponse | undefined>(undefined);
  const [api, contextHolder] = notification.useNotification();
  const { accounts } = useAccount();

  const onChange: TableProps<IAccountResponse>['onChange'] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const create = async (data: Omit<IAccount, 'uuid' | 'userId'>) => {
    const resp = await createAccount(data);
    if (resp.data) {
      api.success({
        message: 'Account created successfully',
      });
    } else {
      api.error({
        message: 'We could not create the account',
      });
    }
    return true;
  };

  const edit = async (data?: IAccountUpdate) => {
    if (data) {
      const resp = await updateAccount(data);
      if (resp.data) {
        api.success({
          message: 'Account updated successfully',
        });
      } else {
        api.error({
          message: 'We could not updated the account',
        });
      }
      setEditAccount(undefined);
      return true;
    }
    setEditAccount(undefined);
    return false;
  };

  const handleDelete = (account: IAccountResponse) => {
    showDeleteConfirm({
      onOk: async () => {
        const resp = await deleteAccount(account.uuid);
        if (resp.data.deleted) {
          api.success({
            message: 'Account deleted successfully',
          });
        } else {
          api.error({
            message: 'We could not delete the account',
          });
        }
      },
    });
  };

  const handleEdit = (edit: IAccountResponse) => {
    setEditAccount(edit);
  };

  return (
    <Layout>
      {contextHolder}
      <AccountTable
        accounts={accounts}
        onChange={onChange}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      <AccountModal onFinish={create} />
      <AccountEditModal isOpen={!!editAccount} onFinish={edit} initialData={editAccount} />
    </Layout>
  );
};
export const getServerSideProps: GetServerSideProps = async (props) => {
  const [token, tokenDecoded] = getTokenFormRequest(props.req);
  const userId = tokenDecoded.user_id;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['accounts', userId],
    queryFn: () => getAccountsSSR(userId, token),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Account;
