import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ChangeState() {
  const [isChange, setIsChange] = useState(false);
  const router = useRouter();

  const onClickChange = () => {
    setIsChange(true);
  };

  useEffect(() => {
    alert("Rendered!!!");

    return () => {
      alert("Bye!!");
    };
  }, []);

  useEffect(() => {
    if (isChange) {
      alert("Changed!!!");
    }
  }, [isChange]);

  const onClickMove = () => {
    router.push("/");
  };

  return (
    <>
      <button onClick={onClickChange}>변경</button>
      <button onClick={onClickMove}>이동</button>
    </>
  );
}
