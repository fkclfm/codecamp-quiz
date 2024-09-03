import { useState } from "react"


export default function Counter() {
  const [counter, setCounter] = useState(0)

  function btnClick() {
    setCounter(counter + 1)
  }

  return (
    <div>
      <h3>{counter}</h3>
      <button onClick={btnClick}>카운터 올리기</button>
    </div>
  )
}