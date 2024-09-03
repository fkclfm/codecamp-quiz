import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Component() {
  const router = useRouter();
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("카운트 값 변경");
  }, [count]);

  useEffect(() => {
    console.log("마운트");

    return () => {
      console.log("나가고 실행");
    };
  });

  const onClickCount = () => {
    setCount((prev) => prev + 1);
  };

  const onClickMove = () => {
    router.push("/");
  };

  return (
    <>
      카운터 값: {count}
      <button onClick={onClickCount}>카운트</button>
      <button onClick={onClickMove}>이동</button>
    </>
  );
}
