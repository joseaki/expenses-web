import { Row, Spin } from 'antd';
import styles from './loading.module.css';

const Loading = () => {
  return (
    <Row justify={'center'} align={'middle'} className={styles.overAll}>
      <Spin />
    </Row>
  );
};

export default Loading;
