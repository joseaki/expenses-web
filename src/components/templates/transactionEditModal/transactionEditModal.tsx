import { PropsWithChildren, useRef, useState } from 'react';
import { FormInstance, Modal } from 'antd';
import { ITransactionEditModal } from './transactionEditModal.types';
import { ITransaction } from 'src/interfaces/Transaction.interface';
import TransactionEditForm from 'src/components/organisms/transactionEditForm/transactionEditForm';

const TransactionEditModal = (props: PropsWithChildren<ITransactionEditModal>) => {
  const { onFinish, isOpen, initialData } = props;
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<FormInstance | null>(null);

  const handleOnFinish = async (data: Omit<ITransaction, 'uuid'>) => {
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
      onFinish();
    }
  };

  return (
    <Modal
      title="Edit transaction"
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
      destroyOnClose
    >
      <TransactionEditForm
        formRef={formRef}
        onFinish={handleOnFinish}
        isLoading={isLoading}
        initialData={initialData}
      />
    </Modal>
  );
};

export default TransactionEditModal;
