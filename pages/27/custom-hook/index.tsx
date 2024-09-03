import { useState } from "react";
import { useCountUp } from "../../../src/components/commons/hooks/useCountUp";

export default function QuizPage() {
  const { count, onClickCountUp } = useCountUp();

  return (
    <>
      <div>
        <p>지금의 카운트는 {count} 입니다!</p>
        <button onClick={onClickCountUp}>Count up!</button>
      </div>
    </>
  );
}
