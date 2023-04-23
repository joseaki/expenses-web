import { PropsWithChildren, useEffect, useRef } from 'react';
import { Button, DatePicker, Form, Input, InputNumber, InputRef, Select } from 'antd';
import { ITransactionEditForm } from './transactionEditForm.types';
import { PaymentMethod, TransactionType } from 'src/interfaces/Transaction.interface';
import useAccount from 'src/hooks/useAccount';
import dayjs from 'dayjs';

const TransactionEditForm = (props: PropsWithChildren<ITransactionEditForm>) => {
  const { formRef, onFinish, isLoading, initialData } = props;
  const { accounts } = useAccount();
  const nameInputRef = useRef<InputRef | null>(null);

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  return (
    <Form
      initialValues={{ ...initialData, dateTime: dayjs(initialData?.dateTime) }}
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
        rules={[{ required: true, message: 'Please select a type!' }]}
      >
        <Select options={Object.keys(TransactionType).map((value) => ({ value, label: value }))} />
      </Form.Item>

      <Form.Item
        label="Amount"
        name="amount"
        rules={[{ required: true, message: 'Please input the transaction amount!' }]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="Currency"
        name="currency"
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
        rules={[{ required: true, message: 'Please select an account!' }]}
      >
        <Select
          options={accounts.map((account) => ({ value: account.uuid, label: account.name }))}
        />
      </Form.Item>

      <Form.Item
        label="Payment method"
        name="paymentMethod"
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

export default TransactionEditForm;
