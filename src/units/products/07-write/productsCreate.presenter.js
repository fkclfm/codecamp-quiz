import {Btn, InputType } from "./productsCreate.styles"

export default function ProductsCreateUI(props) {
  
  return (
    <div>
      판매자 이름 : <InputType type="text" onChange={props.seller}/>
      제품 명 : <InputType type="text" onChange={props.name} />
      설명 : <InputType type="text" onChange={props.detail} />
      가격 : <InputType type="text" onChange={props.price} />
      <Btn disabled={props.btnTrue} onClick={props.btn}>GRAPH_API 요청하기</Btn>
    </div>
  )
}    
    
    