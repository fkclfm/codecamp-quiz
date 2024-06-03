import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import ProductsCreateUI from "./productsCreate.presenter"
import { CREATE_PRODUCT } from "./productsCreate.queries"

export default function ProductCreate() {
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
      router.push(`/06/boards/${result.data.createProduct._id}`)
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
    <ProductsCreateUI
      seller={onChangeSeller}
      name={onChangeName}
      detail={onChangeDetail}
      price={onChangePrice}
      btn={onClickBtn}
    />
  )
}