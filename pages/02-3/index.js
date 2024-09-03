import { useState } from "react"


export default function Certification() {

  const [verification, setVerification] = useState("000000")

  function Check() {
    //Math를 이용해 floor로 정수로 변환 random으로 1000000안에 있는 0~ 1000000의 랜덤한 숫자
    //String으로 문자열 변환, padstart로 6자리의 0을 알아서 채워줌
    setVerification(String(Math.floor(Math.random() * 1000000)).padStart(6, "0"))
  }

  return (
    <div>
      <h3>{verification}</h3>
      <button onClick={Check}>인증번호 전송</button>
    </div>
  )
}