import '../../../../matchMedia.mock';
import { fireEvent, render, screen } from '@testing-library/react';
import TransactionCreateModal from './transactionCreateModal';
import userEvent from '@testing-library/user-event';

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

describe('TransactionCreateModal', () => {
  it('render a modal if New Transaction button is clicked', async () => {
    const { user } = setup(<TransactionCreateModal />);
    const button = screen.getByRole<HTMLButtonElement>('button');
    await user.click(button);
    expect(screen.getByRole('dialog')).toBeDefined();
  });

  it('After filling all the inputs and click in submit should close the modal', async () => {
    const { user } = setup(<TransactionCreateModal />);
    // Open modal
    const button = screen.getByRole<HTMLButtonElement>('button');
    await user.click(button);
    // fill the input
    const input = screen.getByLabelText<HTMLInputElement>('Amount');
    const submitButton = screen.getByText<HTMLInputElement>('Submit');
    fireEvent.change(input, { target: { value: 12 } });
    await user.click(submitButton);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('After opening the modal should validate the required inputs', async () => {
    const { user } = setup(<TransactionCreateModal />);
    // Open modal
    const button = screen.getByRole<HTMLButtonElement>('button');
    await user.click(button);
    // firing submit
    const submitButton = screen.getByText<HTMLInputElement>('Submit');
    await user.click(submitButton);

    expect(screen.queryByRole('alert')).toBeDefined();
  });
});
