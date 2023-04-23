import { PropsWithChildren, useRef, useState } from 'react';
import { Button, FormInstance, Modal } from 'antd';
import AccountForm from 'src/components/organisms/accountForm/accountForm';
import { IAccountModal } from './accountCreateModal.types';
import { IAccount } from 'src/interfaces/Account.interface';

const AccountModal = (props: PropsWithChildren<IAccountModal>) => {
  const { onFinish } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<FormInstance | null>(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOnFinish = async (data: Omit<IAccount, 'uuid' | 'userId'>) => {
    if (onFinish) {
      setIsLoading(true);
      const isOk = await onFinish(data);
      setIsLoading(false);
      if (formRef.current && isOk) {
        formRef.current?.resetFields();
      }
    }

    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        New Account
      </Button>
      {isModalOpen ? (
        <Modal
          title="Create account"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <AccountForm formRef={formRef} onFinish={handleOnFinish} isLoading={isLoading} />
        </Modal>
      ) : null}
    </>
  );
};

export default AccountModal;
