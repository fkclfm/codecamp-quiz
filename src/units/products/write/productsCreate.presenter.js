export default function ProductsCreateUI(props) {
  
  return (
    <div>
      판매자 이름 : <input type="text" onChange={props.seller}/>
      제품 명 : <input type="text" onChange={props.name} />
      설명 : <input type="text" onChange={props.detail} />
      가격 : <input type="text" onChange={props.price} />
      <button onClick={props.btn}>GRAPH_API 요청하기</button>
    </div>
  )
}    
    
    