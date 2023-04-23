import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { Modal, TablePaginationConfig } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import useTransaction from 'src/hooks/useTransaction';
import { Layout } from 'src/components/templates/layout/layout';
import { getTransactionsSSR } from 'src/services/transaction.service';
import {
  ITransactionCreate,
  ITransactionResponse,
  ITransactionUpdate,
} from 'src/interfaces/Transaction.interface';
import TransactionTable from 'src/components/templates/transactionTable/transactionTable';
import { getTokenFormRequest } from 'src/lib/token.utils';
import { getAccountsSSR } from 'src/services/account.service';
import TransactionModal from 'src/components/templates/transactionCreateModal/transactionCreateModal';
import TransactionEditModal from 'src/components/templates/transactionEditModal/transactionEditModal';

const { confirm } = Modal;

const showDeleteConfirm = ({ onOk, onCancel }: { onOk: () => void; onCancel?: () => void }) => {
  confirm({
    title: 'Are you sure you want to delete this transaction?',
    icon: <ExclamationCircleFilled />,
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk: onOk,
    onCancel: onCancel,
  });
};

const Transaction = () => {
  const [page, setPage] = useState(1);
  const [editTransaction, setEditTransaction] = useState<ITransactionResponse | undefined>(
    undefined
  );
  const {
    transactions,
    createTransactionMutation,
    updateTransactionMutation,
    deleteTransactionMutation,
    contextHolder,
  } = useTransaction(page);

  const create = (data: ITransactionCreate) => {
    createTransactionMutation.mutate(data);
  };

  const edit = (data?: ITransactionUpdate) => {
    if (data) {
      updateTransactionMutation.mutate(data);
    }
    setEditTransaction(undefined);
  };

  const handleDelete = (transaction: ITransactionResponse) => {
    showDeleteConfirm({
      onOk: async () => {
        deleteTransactionMutation.mutate(transaction.uuid);
      },
    });
  };

  const handleEdit = (edit: ITransactionResponse) => {
    setEditTransaction(edit);
  };

  const onTableChange = (pagination: TablePaginationConfig) => {
    setPage(pagination.current ?? 1);
  };

  return (
    <Layout>
      {contextHolder}
      <TransactionModal onFinish={create} />
      <TransactionTable
        transactions={transactions.items}
        onChange={onTableChange}
        total={transactions.count}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      <TransactionEditModal
        isOpen={!!editTransaction}
        onFinish={edit}
        initialData={editTransaction}
      />
    </Layout>
  );
};
export const getServerSideProps: GetServerSideProps = async (props) => {
  const [token, tokenDecoded] = getTokenFormRequest(props.req);
  const userId = tokenDecoded.user_id;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['transactions', userId, 1],
    queryFn: () => getTransactionsSSR(token),
  });

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

export default Transaction;
