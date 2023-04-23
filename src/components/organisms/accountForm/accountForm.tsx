import { PropsWithChildren, useEffect, useRef } from 'react';
import { Button, Form, Input, InputNumber, InputRef, Select } from 'antd';
import { IAccountForm } from './accountForm.types';

const AccountForm = (props: PropsWithChildren<IAccountForm>) => {
  const { formRef, onFinish, isLoading } = props;
  const nameInputRef = useRef<InputRef | null>(null);

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
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
        label="Account name"
        name="name"
        rules={[{ required: true, message: 'Please input a name!' }]}
      >
        <Input ref={nameInputRef} />
      </Form.Item>

      <Form.Item
        label="Initial Value"
        name="initialValue"
        initialValue={0}
        rules={[{ required: true, message: 'Please input an initial value!' }]}
      >
        <InputNumber />
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
        label="Color"
        name="color"
        initialValue={'#00b96b'}
        rules={[{ required: true, message: 'Please select a color!' }]}
      >
        <Input type="color" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AccountForm;
