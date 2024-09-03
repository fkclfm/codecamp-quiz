import { Modal } from "antd";
import { useState } from "react";

export default function ModalAlertPage() {
  const [isOpen, setIsOpen] = useState(false);

  const onToggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <button onClick={onToggleModal}>모달창 열기!!</button>
      {isOpen && (
        <Modal open={true} onOk={onToggleModal} onCancel={onToggleModal}>
          게시글을 등록하였습니다.
        </Modal>
      )}
    </>
  );
}
