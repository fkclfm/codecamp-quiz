import { Rate, Button, Modal } from "antd";
import { useState } from "react";

export default function Star() {
  const [value, setValue] = useState(0);
  const [isTrue, setIsTrue] = useState(false);

  function handleChange(value: number) {
    setValue(value);
  }

  const handleModal = () => {
    Modal.error({ content: "에러입니다. 다시시도해주세요." });
    setIsTrue((prev) => !prev);
  };
  return (
    <>
      <Rate onChange={handleChange} value={value} />
      <span>{value}점</span>
      <Button type="primary" onClick={handleModal}></Button>
      {value === 3 && (
        <>
          <Modal
            title="Basic Modal"
            open={true}
            onOk={handleModal}
            onCancel={handleModal}
          ></Modal>
        </>
      )}
    </>
  );
}
