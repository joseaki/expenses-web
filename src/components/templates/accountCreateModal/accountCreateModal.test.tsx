import '../../../../matchMedia.mock';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import AccountCreateModal from './accountCreateModal';
import userEvent from '@testing-library/user-event';

function setup(component: any) {
  const user = userEvent.setup();
  render(component);
  return { user };
}

describe('AccountCreateModal', () => {
  it('render a modal if New Account button is clicked', async () => {
    const { user } = setup(<AccountCreateModal />);
    const button = screen.getByRole<HTMLButtonElement>('button');
    await user.click(button);
    expect(screen.getByRole('dialog')).toBeDefined();
  });

  it('After filling all the inputs and click in submit should close the modal', async () => {
    const { user } = setup(<AccountCreateModal />);
    // Open modal
    const button = screen.getByRole<HTMLButtonElement>('button');
    await user.click(button);
    // fill the input
    const input = screen.getByLabelText<HTMLInputElement>('Account name');
    const submitButton = screen.getByText<HTMLInputElement>('Submit');
    fireEvent.change(input, { target: { value: 'Account' } });
    await user.click(submitButton);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('After opening the modal should validate the required inputs', async () => {
    const { user } = setup(<AccountCreateModal />);
    // Open modal
    const button = screen.getByRole<HTMLButtonElement>('button');
    await user.click(button);
    // firing submit
    const submitButton = screen.getByText<HTMLInputElement>('Submit');
    await user.click(submitButton);

    expect(screen.queryByRole('alert')).toBeDefined();
  });
});
