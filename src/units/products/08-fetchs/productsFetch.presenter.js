export default function ProductsFetchUI(props) {
  return (
    <div>
      {props.data?.fetchProducts.map(el => (   //map 뒤에 있는 것이 el 즉 요소가 되는 것
        <div key={el._id}>
          <span>
            <input type="checkbox" />
          </span>
          <span style={{ margin : "10px"}}>{el.seller}</span>
          <span style={{ margin : "10px"}}>{el.name}</span>
          <span style={{ margin : "10px"}}>{el.detail}</span>
          <span style={{ margin : "10px"}}>{el.price}</span>
          <span>
            <button id={el._id} onClick={props.onClickDelete}>삭제</button>
          </span>
        </div>
      ))}
    </div>
  )
} 