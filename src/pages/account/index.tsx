import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import useAccount from 'src/hooks/useAccount';
import { Layout } from 'src/components/templates/layout/layout';
import { getAccountsSSR } from 'src/services/account.service';
import { IAccount, IAccountResponse, IAccountUpdate } from 'src/interfaces/Account.interface';
import AccountModal from 'src/components/templates/accountCreateModal/accountCreateModal';
import AccountTable from 'src/components/templates/accountTable/accountTable';
import { getTokenFormRequest } from 'src/lib/token.utils';
import AccountEditModal from 'src/components/templates/accountEditModal/accountEditModal';

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
  const {
    accounts,
    createAccountMutation,
    updateAccountMutation,
    deleteAccountMutation,
    contextHolder,
  } = useAccount();

  const create = (data: Omit<IAccount, 'uuid' | 'userId'>) => {
    createAccountMutation.mutate(data);
  };

  const edit = (data?: IAccountUpdate) => {
    if (data) {
      updateAccountMutation.mutate(data);
    }
    setEditAccount(undefined);
  };

  const handleDelete = (account: IAccountResponse) => {
    showDeleteConfirm({
      onOk: async () => {
        deleteAccountMutation.mutate(account.uuid);
      },
    });
  };

  const handleEdit = (edit: IAccountResponse) => {
    setEditAccount(edit);
  };

  return (
    <Layout>
      {contextHolder}
      <AccountModal onFinish={create} />
      <AccountTable accounts={accounts} onDelete={handleDelete} onEdit={handleEdit} />
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
    queryFn: () => getAccountsSSR(token),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Account;
