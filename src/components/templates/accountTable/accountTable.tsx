import { Button, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { IAccountResponse } from 'src/interfaces/Account.interface';
import { IAccountTable } from './accountTable.types';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const AccountTable = (props: IAccountTable) => {
  const { accounts = [], onChange, onDelete, onEdit } = props;

  const columns: ColumnsType<IAccountResponse> = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Initial value',
      dataIndex: 'initialValue',
      defaultSortOrder: 'descend',
      sorter: true,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      sorter: true,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Color',
      dataIndex: 'color',
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

  return <Table columns={columns} rowKey="uuid" dataSource={accounts} onChange={onChange} />;
};

export default AccountTable;
