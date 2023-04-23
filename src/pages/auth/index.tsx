import { Typography, Col, Row, Button, message } from 'antd';
import { useRouter } from 'next/router';
import { signIn } from 'src/services/signin.service';
import AuthenticationForm from 'src/components/organisms/authenticationForm/authenticationForm';
import { ILoginInputs } from 'src/interfaces/Pages/auth.interface';
import styles from 'src/styles/Auth.module.css';
import Link from 'next/link';
import { useState } from 'react';
import { AuthErrorCodes } from 'firebase/auth';

const { Title } = Typography;

const Auth = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onFinish = async (values: ILoginInputs) => {
    setLoading(true);
    const { result, error } = await signIn(values.email, values.password);
    if (error) {
      if (error.message.includes('user-not-found')) {
        messageApi.error('Email not found');
      } else {
        messageApi.error('Try again');
      }
      setLoading(false);
      return console.log(error.message);
    }
    const token = await result?.user.getIdToken();
    document.cookie = `token=${token}; path=/`;
    setLoading(false);
    return router.push('/');
  };

  return (
    <Col span={24}>
      {contextHolder}
      <Row justify="center" align="middle" style={{ height: '100%' }}>
        <Col span={4} xs={22} sm={12} lg={6}>
          <Title className={styles.textCenter}>Login</Title>
          <AuthenticationForm onFinish={onFinish} buttonText="Login" loading={loading} />
          <Link href="auth/signup">
            <Button className={styles.fullWidth}>Create an account</Button>
          </Link>
        </Col>
      </Row>
    </Col>
  );
};

export default Auth;
