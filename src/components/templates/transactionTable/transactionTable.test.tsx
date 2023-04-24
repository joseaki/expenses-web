import '../../../../matchMedia.mock';
import { render, screen } from '@testing-library/react';
import TransactionTable from './transactionTable';
import userEvent from '@testing-library/user-event';
import { PaymentMethod, TransactionType } from 'src/interfaces/Transaction.interface';

jest.mock('../../../hooks/useAccount', () => {
  return jest.fn(() => ({
    accounts: [
      {
        uuid: 'uuid',
        name: 'BANK',
        initialValue: 100,
        currency: 'USD',
        color: '#000000',
      },
    ],
  }));
});

function setup(component: any) {
  const user = userEvent.setup();
  render(component);
  return { user };
}

describe('TransactionTable', () => {
  it('render a table', async () => {
    setup(<TransactionTable />);
    expect(screen.getByRole('table')).toBeDefined();
  });

  it('Should render a table with 2 body rows', async () => {
    const transactions = [
      {
        uuid: 'uuid',
        type: TransactionType.EXPENSE,
        amount: 10,
        currency: 'USD',
        accountId: 'id',
        userId: 'uid',
        dateTime: '2023-04-24T02:04:15.250Z',
        paymentMethod: PaymentMethod.CASH,
      },
      {
        uuid: 'uuid2',
        type: TransactionType.EXPENSE,
        amount: 10,
        currency: 'USD',
        accountId: 'id',
        userId: 'uid',
        dateTime: '2023-04-24T02:04:15.250Z',
        paymentMethod: PaymentMethod.CASH,
      },
    ];
    setup(<TransactionTable transactions={transactions} />);

    const rows = screen.getAllByRole('row');
    expect(rows.length - 1).toBe(2);
  });

  it('Click in the delete button should call the onDelete function', async () => {
    const transactions = [
      {
        uuid: 'uuid',
        type: TransactionType.EXPENSE,
        amount: 10,
        currency: 'USD',
        accountId: 'id',
        userId: 'uid',
        dateTime: '2023-04-24T02:04:15.250Z',
        paymentMethod: PaymentMethod.CASH,
      },
      {
        uuid: 'uuid2',
        type: TransactionType.EXPENSE,
        amount: 10,
        currency: 'USD',
        accountId: 'id',
        userId: 'uid',
        dateTime: '2023-04-24T02:04:15.250Z',
        paymentMethod: PaymentMethod.CASH,
      },
    ];
    const onDelete = jest.fn();
    const { user } = setup(<TransactionTable transactions={transactions} onDelete={onDelete} />);
    const [deleteButton] = screen.getAllByRole('button', {
      name: /delete/i,
    });
    await user.click(deleteButton);
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it('Click in the delete button should call the onEdit function', async () => {
    const transactions = [
      {
        uuid: 'uuid',
        type: TransactionType.EXPENSE,
        amount: 10,
        currency: 'USD',
        accountId: 'id',
        userId: 'uid',
        dateTime: '2023-04-24T02:04:15.250Z',
        paymentMethod: PaymentMethod.CASH,
      },
      {
        uuid: 'uuid2',
        type: TransactionType.EXPENSE,
        amount: 10,
        currency: 'USD',
        accountId: 'id',
        userId: 'uid',
        dateTime: '2023-04-24T02:04:15.250Z',
        paymentMethod: PaymentMethod.CASH,
      },
    ];
    const onEdit = jest.fn();
    const { user } = setup(<TransactionTable transactions={transactions} onEdit={onEdit} />);
    const [editButton] = screen.getAllByRole('button', {
      name: /edit/i,
    });
    await user.click(editButton);
    expect(onEdit).toHaveBeenCalledTimes(1);
  });
});
