import { useQuery, gql } from "@apollo/client"
import { useRouter } from "next/router"


const FETCH_PRODUCT = gql`
query fetchProduct($productId: ID) {
  fetchProduct(productId: $productId) {
    _id
    seller
    name
    detail
    price
  } 
} 
`
export default function dynamicRouting() {
  const router  = useRouter()
  const { data } = useQuery(FETCH_PRODUCT, {
    variables : { productId : router.query.product} 
  })
  
  return (
    <div>
      <h3>상품 아이디 : {router.query.product}</h3>
      <h3>판매자 : {data ? data.fetchProduct.seller : "loading"}</h3>
      <h3>상품명 : {data ? data.fetchProduct.name : "loading"}</h3>
      <h3>상품내용 : {data ? data.fetchProduct.detail : "loading"}</h3>
      <h3>가격 : { data ? data.fetchProduct.price : "loading"}</h3>
    </div>
  )
}