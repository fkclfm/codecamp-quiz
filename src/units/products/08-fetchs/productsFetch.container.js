import { useMutation, useQuery } from "@apollo/client"
import { useRouter } from "next/router"
import { FETCH_PRODUCTS, DELETE_PRODUCT } from "./productsFetch.queries"
import ProductsFetchUI from "./productsFetch.presenter"

export default function ProductsFetch() {
  const router = useRouter()
  const [ deleteProduct ] = useMutation(DELETE_PRODUCT)
  const { data } = useQuery(FETCH_PRODUCTS, {
    variables : { page: Number(router.query.products)}
  })

  const onClickDelete = (event) => {
    deleteProduct({
      variables : { productId: event.target.id },   
      refetchQueries : [
        { 
          query: FETCH_PRODUCTS,
          variables: {page: Number(router.query.products) }
        }
      ]
    }) 
  }
  return (
    <ProductsFetchUI 
      data={data}
      router={router}
      onClickDelete={onClickDelete}
    />
  )
}