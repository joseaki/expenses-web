import { Button, Form, Input } from 'antd';
import { IAuthenticationForm } from './authenticationForm.types';

const AuthenticationForm = (props: IAuthenticationForm) => {
  return (
    <Form
      name="basic"
      layout="vertical"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      onFinish={props.onFinish}
      autoComplete="off"
      disabled={props.loading}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Please input your email!' },
          { type: 'email', message: 'This is not a valid email' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: 'Please input your password!' },
          {
            pattern: new RegExp(
              '^(?=.*)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-#$.%&*!@])(?=.*[a-zA-Z]).{8,32}$'
            ),
            message:
              'Password mus include a number, a lowercase letter, an upper case letter a special character and must have at least 8 characters long',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={props.loading}>
          {props.buttonText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AuthenticationForm;
