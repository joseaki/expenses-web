import '../../../../matchMedia.mock';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import AccountTable from './accountTable';
import userEvent from '@testing-library/user-event';

function setup(component: any) {
  const user = userEvent.setup();
  render(component);
  return { user };
}

describe('AccountTable', () => {
  it('render a table', async () => {
    setup(<AccountTable />);
    expect(screen.getByRole('table')).toBeDefined();
  });

  it('Should render a table with 2 body rows', async () => {
    const accounts = [
      {
        uuid: 'uuid',
        name: 'BANK',
        initialValue: 100,
        currency: 'USD',
        color: '#000000',
      },
      {
        uuid: 'uuid2',
        name: 'BANK',
        initialValue: 100,
        currency: 'USD',
        color: '#000000',
      },
    ];
    setup(<AccountTable accounts={accounts} />);

    const rows = screen.getAllByRole('row');
    expect(rows.length - 1).toBe(2);
  });

  it('Click in the delete button should call the onDelete function', async () => {
    const accounts = [
      {
        uuid: 'uuid',
        name: 'BANK',
        initialValue: 100,
        currency: 'USD',
        color: '#000000',
      },
      {
        uuid: 'uuid2',
        name: 'BANK',
        initialValue: 100,
        currency: 'USD',
        color: '#000000',
      },
    ];
    const onDelete = jest.fn();
    const { user } = setup(<AccountTable accounts={accounts} onDelete={onDelete} />);
    const [deleteButton] = screen.getAllByRole('button', {
      name: /delete/i,
    });
    await user.click(deleteButton);
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it('Click in the delete button should call the onEdit function', async () => {
    const accounts = [
      {
        uuid: 'uuid',
        name: 'BANK',
        initialValue: 100,
        currency: 'USD',
        color: '#000000',
      },
      {
        uuid: 'uuid2',
        name: 'BANK',
        initialValue: 100,
        currency: 'USD',
        color: '#000000',
      },
    ];
    const onEdit = jest.fn();
    const { user } = setup(<AccountTable accounts={accounts} onEdit={onEdit} />);
    const [editButton] = screen.getAllByRole('button', {
      name: /edit/i,
    });
    await user.click(editButton);
    expect(onEdit).toHaveBeenCalledTimes(1);
  });
});
