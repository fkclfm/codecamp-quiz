export default function hof() {
  const onClickButton = (number: number) => () => {
    console.log(number);
  };

  return (
    <>
      <button onClick={onClickButton(123)}>HOF GO</button>
    </>
  );
}
