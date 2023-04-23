import dayjs from 'dayjs';
import { Button, Space, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { ITransactionResponse, TransactionType } from 'src/interfaces/Transaction.interface';
import { ITransactionTable } from './transactionTable.types';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import useAccount from 'src/hooks/useAccount';

const TransactionTable = (props: ITransactionTable) => {
  const { transactions = [], total, onChange, onDelete, onEdit } = props;
  const { accounts } = useAccount();

  const columns: ColumnsType<ITransactionResponse> = [
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Amount',
      align: 'right',
      render: (transaction: ITransactionResponse) =>
        transaction.type === TransactionType.INCOME ? (
          <Tag color="success">{transaction.amount.toFixed(2)}</Tag>
        ) : (
          <Tag color="error">-{transaction.amount.toFixed(2)}</Tag>
        ),
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
    },
    {
      title: 'Account',
      render: (transaction) => {
        const account = accounts.find((account) => transaction.accountId === account.uuid);
        return (
          <span>
            <Tag color={account?.color ?? 'red'}>{account?.name ?? ''}</Tag>
          </span>
        );
      },
    },
    {
      title: 'Date',
      render: (transaction: ITransactionResponse) => (
        <span>{dayjs(transaction.dateTime).format('MM/DD/YYYY HH:mm')}</span>
      ),
    },
    {
      title: 'Payment method',
      dataIndex: 'paymentMethod',
    },
    {
      title: '',
      render: (value) => (
        <Space>
          <Button
            onClick={() => (onDelete ? onDelete(value) : null)}
            type="primary"
            shape="circle"
            icon={<DeleteOutlined />}
            danger
          />
          <Button
            onClick={() => (onEdit ? onEdit(value) : null)}
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
          />
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      pagination={{ total: total }}
      rowKey="uuid"
      dataSource={transactions.slice(0, 10)}
      onChange={onChange}
    />
  );
};

export default TransactionTable;
