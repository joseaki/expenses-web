import { PropsWithChildren, useEffect, useRef } from 'react';
import { Button, Form, Input, InputNumber, DatePicker, Select } from 'antd';
import { ITransactionForm } from './transactionForm.types';
import { PaymentMethod, TransactionType } from 'src/interfaces/Transaction.interface';
import useAccount from 'src/hooks/useAccount';
import dayjs from 'dayjs';

const TransactionForm = (props: PropsWithChildren<ITransactionForm>) => {
  const { formRef, onFinish, isLoading } = props;
  const { accounts } = useAccount();
  const amountInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (amountInputRef.current) {
      amountInputRef.current.focus();
    }
  }, []);

  return (
    <Form
      ref={formRef}
      name="basic"
      layout="vertical"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Transaction type"
        name="type"
        initialValue={Object.keys(TransactionType)[0]}
        rules={[{ required: true, message: 'Please select a type!' }]}
      >
        <Select options={Object.keys(TransactionType).map((value) => ({ value, label: value }))} />
      </Form.Item>

      <Form.Item
        label="Amount"
        name="amount"
        initialValue={0}
        rules={[{ required: true, message: 'Please input the transaction amount!' }]}
      >
        <InputNumber ref={amountInputRef} />
      </Form.Item>

      <Form.Item
        label="Currency"
        name="currency"
        initialValue={'USD'}
        rules={[{ required: true, message: 'Please select a currency!' }]}
      >
        <Select
          options={[
            { value: 'USD', label: 'Dolar' },
            { value: 'EUR', label: 'Euro' },
            { value: 'PEN', label: 'Soles' },
          ]}
        />
      </Form.Item>

      <Form.Item
        label="Account"
        name="accountId"
        initialValue={accounts[0].uuid}
        rules={[{ required: true, message: 'Please select an account!' }]}
      >
        <Select
          options={accounts.map((account) => ({ value: account.uuid, label: account.name }))}
        />
      </Form.Item>

      <Form.Item
        label="Payment method"
        name="paymentMethod"
        initialValue={Object.keys(PaymentMethod)[0]}
        rules={[{ required: true, message: 'Please select a type!' }]}
      >
        <Select
          options={Object.keys(PaymentMethod).map((value) => ({
            value,
            label: value.split('_').join(' '),
          }))}
        />
      </Form.Item>

      <Form.Item
        label="Date"
        name="dateTime"
        initialValue={dayjs()}
        rules={[{ required: true, message: 'Please select a date!' }]}
      >
        <DatePicker showTime={{ format: 'HH:mm' }} />
      </Form.Item>

      <Form.Item label="Description" name="description">
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TransactionForm;
