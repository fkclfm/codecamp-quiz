import { Btn, InputType } from "./productsCreate.styles";

export default function ProductsCreateUI(props) {
  return (
    <div>
      판매자 이름 :{" "}
      <InputType
        type="text"
        onChange={props.seller}
        defaultValue={props.data?.fetchProduct.seller}
        readOnly={props.isEdit}
      />
      제품 명 :{" "}
      <InputType
        type="text"
        onChange={props.name}
        defaultValue={props.data?.fetchProduct.name}
      />
      설명 :{" "}
      <InputType
        type="text"
        onChange={props.detail}
        defaultValue={props.data?.fetchProduct.detail}
      />
      가격 :{" "}
      <InputType
        type="text"
        onChange={props.price}
        defaultValue={props.data?.fetchProduct.price}
      />
      <Btn onClick={props.isEdit ? props.onClickEdit : props.onClickNew}>
        {props.isEdit ? "수정하기" : "등록하기"}
      </Btn>
    </div>
  );
}
