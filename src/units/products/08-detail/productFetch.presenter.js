export default function ProductFetchUI(props) {
  return (
    <div>
      <span style={{ margin: "10px" }}>
        판매자 :{props.data?.fetchProduct.seller}
      </span>
      <span style={{ margin: "10px" }}>
        상품 이름 :{props.data?.fetchProduct.name}
      </span>
      <span style={{ margin: "10px" }}>
        상품 설명 : {props.data?.fetchProduct.detail}
      </span>
      <span style={{ margin: "10px" }}>
        가격 : {props.data?.fetchProduct.price}
      </span>
      <span>
        <button onClick={props.onEdit}>수정하기</button>
        <button id={props.data?.fetchProduct._id} onClick={props.onClickDelete}>
          삭제
        </button>
      </span>
    </div>
  );
}
