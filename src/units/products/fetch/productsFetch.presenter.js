export default function ProductsFetchUI(props) {
  return (
    <div>
      <h3>상품 아이디 : {props.router.query.products}</h3>
      {/* <h3>상품 아이디 : {router.query.product}</h3> */}
      <h3>판매자 : {props.data ? props.data.fetchProduct.seller : "loading"}</h3>
      <h3>상품명 : {props.data ? props.data.fetchProduct.name : "loading"}</h3>
      <h3>상품내용 : {props.data ? props.data.fetchProduct.detail : "loading"}</h3>
      <h3>가격 : { props.data ? props.data.fetchProduct.price : "loading"}</h3>
    </div>
  )
} 