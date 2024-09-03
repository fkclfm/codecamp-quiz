import { useState } from "react";

interface IUseCountUpReturn {
  count: number;
  onClickCountUp: () => void;
}
export const useCountUp = (): IUseCountUpReturn => {
  const [count, setCount] = useState(0);

  const onClickCountUp = () => {
    setCount((prev) => prev + 1);
  };

  return {
    count,
    onClickCountUp,
  };
};
