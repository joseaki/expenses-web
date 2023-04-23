import { Typography, Col, Row } from 'antd';
import { useRouter } from 'next/router';
import { signIn } from 'src/services/signin.service';
import AuthenticationForm from 'src/components/organisms/authenticationForm/authenticationForm';
import { ILoginInputs } from 'src/interfaces/Pages/auth.interface';
import styles from 'src/styles/Auth.module.css';

const { Title, Paragraph, Text, Link } = Typography;

const Auth = () => {
  const router = useRouter();
  const onFinish = async (values: ILoginInputs) => {
    const { result, error } = await signIn(values.email, values.password);
    if (error) {
      return console.log(error);
    }
    return router.push('/');
  };

  return (
    <Col span={24}>
      <Row justify="center" align="middle" style={{ height: '100%' }}>
        <Col span={12}>
          <Title style={{ textAlign: 'center' }}>Login</Title>
          <AuthenticationForm onFinish={onFinish} />
        </Col>
      </Row>
    </Col>
  );
};

export default Auth;
