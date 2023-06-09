import { PropsWithChildren, useRef, useState } from 'react';
import { FormInstance, Modal } from 'antd';
import { IAccountEditModal } from './accountEditModal.types';
import { IAccount } from 'src/interfaces/Account.interface';
import AccountEditForm from 'src/components/organisms/accountEditForm/accountEditForm';

const AccountEditModal = (props: PropsWithChildren<IAccountEditModal>) => {
  const { onFinish, isOpen, initialData } = props;
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<FormInstance | null>(null);

  const handleOnFinish = async (data: Omit<IAccount, 'uuid' | 'userId' | 'currency'>) => {
    if (onFinish) {
      setIsLoading(true);
      const isOk = await onFinish({ uuid: initialData?.uuid ?? '', ...data });
      setIsLoading(false);
      if (formRef.current && isOk) {
        formRef.current?.resetFields();
      }
    }
  };

  const handleCancel = () => {
    if (onFinish) {
      formRef.current?.resetFields();
      formRef.current = null;
      onFinish();
    }
  };

  return (
    <Modal title="Edit account" open={isOpen} onCancel={handleCancel} destroyOnClose footer={null}>
      <AccountEditForm
        formRef={formRef}
        onFinish={handleOnFinish}
        isLoading={isLoading}
        initialData={initialData}
      />
    </Modal>
  );
};

export default AccountEditModal;
