import '../../../../matchMedia.mock';
import { fireEvent, render, screen } from '@testing-library/react';
import TransactionEditModal from './transactionEditModal';
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

describe('TransactionEditModal', () => {
  it('render a modal', async () => {
    const { user } = setup(<TransactionEditModal isOpen />);
    expect(screen.getByRole('dialog')).toBeDefined();
  });

  it('After filling all the inputs and click in submit should call the onFinish method', async () => {
    const initialData = {
      uuid: 'uuid',
      type: TransactionType.EXPENSE,
      amount: 10,
      currency: 'USD',
      accountId: 'id',
      userId: 'uid',
      dateTime: '2023-04-24T02:04:15.250Z',
      paymentMethod: PaymentMethod.CASH,
    };
    const onFinish = jest.fn();
    const { user } = setup(
      <TransactionEditModal isOpen onFinish={onFinish} initialData={initialData} />
    );
    // fill the input
    const input = screen.getByLabelText<HTMLInputElement>('Amount');
    const submitButton = screen.getByText<HTMLInputElement>('Submit');
    fireEvent.change(input, { target: { value: 12 } });
    await user.click(submitButton);

    expect(onFinish).toHaveBeenCalledTimes(1);
  });

  it('After opening the modal should validate the required inputs', async () => {
    const initialData = {
      uuid: 'uuid',
      type: TransactionType.EXPENSE,
      amount: 10,
      currency: 'USD',
      accountId: 'id',
      userId: 'uid',
      dateTime: '2023-04-24T02:04:15.250Z',
      paymentMethod: PaymentMethod.CASH,
    };
    const { user } = setup(<TransactionEditModal isOpen initialData={initialData} />);
    const amountInput = screen.getByLabelText('Amount');
    fireEvent.change(amountInput, { target: { value: '' } });
    // firing submit
    const submitButton = screen.getByText<HTMLInputElement>('Submit');
    await user.click(submitButton);

    expect(screen.getByRole('alert')).toBeDefined();
  });
});
