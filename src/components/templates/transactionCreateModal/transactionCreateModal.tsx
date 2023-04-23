import { PropsWithChildren, useRef, useState } from 'react';
import { Button, FormInstance, Modal } from 'antd';
import TransactionForm from 'src/components/organisms/transactionForm/transactionForm';
import { ITransactionModal } from './transactionCreateModal.types';
import { ITransactionCreate } from 'src/interfaces/Transaction.interface';

const TransactionModal = (props: PropsWithChildren<ITransactionModal>) => {
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

  const handleOnFinish = async (data: ITransactionCreate) => {
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
        New Transaction
      </Button>
      {isModalOpen ? (
        <Modal
          title="Create transaction"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          destroyOnClose
        >
          <TransactionForm formRef={formRef} onFinish={handleOnFinish} isLoading={isLoading} />
        </Modal>
      ) : null}
    </>
  );
};

export default TransactionModal;
