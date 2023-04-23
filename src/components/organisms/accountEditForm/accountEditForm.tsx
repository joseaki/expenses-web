import { PropsWithChildren, useEffect, useRef } from 'react';
import { Button, Form, Input, InputNumber, InputRef } from 'antd';
import { IAccountEditForm } from './accountEditForm.types';

const AccountEditForm = (props: PropsWithChildren<IAccountEditForm>) => {
  const { formRef, onFinish, isLoading, initialData } = props;
  const nameInputRef = useRef<InputRef | null>(null);

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  return (
    <Form
      initialValues={initialData}
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
        rules={[{ required: true, message: 'Please input an initial value!' }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="Color"
        name="color"
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

export default AccountEditForm;
