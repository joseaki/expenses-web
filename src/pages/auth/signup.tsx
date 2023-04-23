import { Typography, Col, Row, Button, message } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import AuthenticationForm from 'src/components/organisms/authenticationForm/authenticationForm';
import { ILoginInputs } from 'src/interfaces/Pages/auth.interface';
import { signUp } from 'src/services/signup.service';
import styles from 'src/styles/Auth.module.css';

const { Title } = Typography;

const Auth = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values: ILoginInputs) => {
    setLoading(true);
    const { result, error } = await signUp(values.email, values.password);
    if (error) {
      if (error.message.includes('email-already-in-use')) {
        messageApi.error('This email is already in use');
      } else {
        messageApi.error('Something went wrong');
      }
      setLoading(false);
      return console.log(error);
    }
    const token = await result?.user.getIdToken();
    document.cookie = `token=${token}; path=/`;
    setLoading(false);
    return router.replace('/');
  };

  return (
    <Col span={24}>
      {contextHolder}
      <Row justify="center" align="middle" style={{ height: '100%' }}>
        <Col span={4} xs={22} sm={12} lg={6}>
          <Title className={styles.textCenter}>Sign Up</Title>
          <AuthenticationForm onFinish={onFinish} buttonText="Signup" loading={loading} />
          <Link href="/auth">
            <Button className={styles.fullWidth}>Already have an account</Button>
          </Link>
        </Col>
      </Row>
    </Col>
  );
};

export default Auth;
