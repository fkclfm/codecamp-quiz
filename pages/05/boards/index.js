import { ApolloClient, gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";

const CREATE_PRODUCT = gql `
  mutation createProduct ($seller: String, $createProductInput: CreateProductInput!) {
    createProduct(seller: $seller, createProductInput: $createProductInput) {
      _id
      number
      message
    }
  }  
`
export default function GraphQL() {
  const [createProduct] = useMutation(CREATE_PRODUCT)
  const router = useRouter()

  const [seller, setSeller] = useState("")
  const [name, setName] = useState("")
  const [detail, setDetail] = useState("")
  const [price, setPrice] = useState("")

  const onClickBtn = async () => {
    try {
      const result = await createProduct({
        variables : {
          seller : seller,
          createProductInput : {
            name : name,
            detail : detail,
            price : price
          }
        }
      })
      console.log(result)
      router.push(`/05/boards/${result.data.createProduct._id}`)
  } catch(error) {
    alert(error.message)
  }
    
  }

  const onChangeSeller = (event) => {
    setSeller(event.target.value)
  }

  const onChangeName = (event) => {
    setName(event.target.value)
  }

  const onChangeDetail = (event) => {
    setDetail(event.target.value)
  }

  const onChangePrice = (event) => {
    setPrice(Number(event.target.value)) // int형으로 반환하니 문자열에서 Number로 숫자형으로 변환시켜 값 전달
  }

  return (
    <div>
      판매자 이름 : <input type="text" onChange={onChangeSeller}/>
      제품 명 : <input type="text" onChange={onChangeName} />
      설명 : <input type="text" onChange={onChangeDetail} />
      가격 : <input type="text" onChange={onChangePrice} />
      <button onClick={onClickBtn}>GRAPH_API 요청하기</button>
    </div>
  )
}
