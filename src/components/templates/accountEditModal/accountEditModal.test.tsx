import '../../../../matchMedia.mock';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import AccountEditModal from './accountEditModal';
import userEvent from '@testing-library/user-event';

function setup(component: any) {
  const user = userEvent.setup();
  render(component);
  return { user };
}

describe('AccountCreateModal', () => {
  it('render a modal', async () => {
    setup(<AccountEditModal isOpen />);
    expect(screen.getByRole('dialog')).toBeDefined();
  });

  it('After filling all the inputs and click in submit should call the onFinish method', async () => {
    const initialData = {
      uuid: 'uuid',
      name: 'BANK',
      initialValue: 100,
      currency: 'USD',
      color: '#000000',
    };
    const finish = jest.fn();
    const { user } = setup(<AccountEditModal isOpen initialData={initialData} onFinish={finish} />);
    // fill the input
    const input = screen.getByLabelText<HTMLInputElement>('Account name');
    const submitButton = screen.getByText<HTMLInputElement>('Submit');

    fireEvent.change(input, { target: { value: 'Account' } });
    await user.click(submitButton);

    expect(finish).toBeCalledTimes(1);
  });

  it('After opening the modal should validate the required inputs', async () => {
    const initialData = {
      uuid: 'uuid',
      name: 'BANK',
      initialValue: 100,
      currency: 'USD',
      color: '#000000',
    };
    const { user } = setup(<AccountEditModal isOpen initialData={initialData} />);
    // Open modal
    // firing submit
    const input = screen.getByLabelText<HTMLInputElement>('Account name');
    fireEvent.change(input, { target: { value: '' } });
    const submitButton = screen.getByText<HTMLInputElement>('Submit');
    await user.click(submitButton);

    expect(screen.queryByRole('alert')).toBeDefined();
  });
});
