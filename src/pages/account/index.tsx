import { Table } from 'antd';
import { Layout } from 'src/components/templates/layout/layout';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { IAccountResponse } from 'src/interfaces/AccountListResponse';
import { getAccounts } from 'src/services/account.service';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import useAccount from 'src/hooks/useAccount';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (props) => {
  const token = props.req.cookies.token ?? '';
  const [_, content] = token.split('.');
  const decodedToken = Buffer.from(content, 'base64').toString();
  const tokenObject = JSON.parse(decodedToken);

  const userId = tokenObject.user_id;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['accounts', userId],
    queryFn: () => getAccounts(userId),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const Account = () => {
  const { accounts } = useAccount();
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
  ];

  const onChange: TableProps<IAccountResponse>['onChange'] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <Layout>
      <Table columns={columns} dataSource={accounts} onChange={onChange} />
    </Layout>
  );
};

export default Account;
