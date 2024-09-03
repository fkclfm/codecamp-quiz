import { useQuery } from "@apollo/client"
import { useRouter } from "next/router"
import { FETCH_PRODUCT } from "./productsFetch.queries"
import ProductsFetchUI from "./productsFetch.presenter"

export default function ProductsFetch() {
  const router = useRouter()
  const { data } = useQuery(FETCH_PRODUCT, {
    variables : { productId : router.query.products} 
  })
  console.log(data)
  return (
    <ProductsFetchUI 
      data={data}
      router={router}
    />
  )
}