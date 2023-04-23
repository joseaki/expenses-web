import { Typography, Col, Row } from 'antd';
import { useRouter } from 'next/router';
import AuthenticationForm from 'src/components/organisms/authenticationForm/authenticationForm';
import { ILoginInputs } from 'src/interfaces/Pages/auth.interface';
import { signUp } from 'src/services/signup.service';

const { Title } = Typography;

const Auth = () => {
  const router = useRouter();
  const onFinish = async (values: ILoginInputs) => {
    const { result, error } = await signUp(values.email, values.password);
    if (error) {
      return console.log(error);
    }
    const token = await result?.user.getIdToken();
    document.cookie = `token=${token}; path=/`;
    return router.replace('/');
  };

  return (
    <Col span={24}>
      <Row justify="center" align="middle" style={{ height: '100%' }}>
        <Col span={12}>
          <Title style={{ textAlign: 'center' }}>Sign Up</Title>
          <AuthenticationForm onFinish={onFinish} />
        </Col>
      </Row>
    </Col>
  );
};

export default Auth;
