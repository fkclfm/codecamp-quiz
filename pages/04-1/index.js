import axios from "axios";
import { useState } from "react";


export default function GraphQL() {

  const onClickBtn = async () => {
    const data = await axios.get(' https://koreanjson.com/users')
    console.log(data)
  } 
  
  
  return (
    <div>
      <button onClick={onClickBtn}>REST-API 요청하기</button>
    </div>
)
  
} 