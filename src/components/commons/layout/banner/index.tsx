import styled from "@emotion/styled";

const Wrapper = styled.div`
  height: 300px;
  background: pink;
`;

interface IbannerProps {
  children: any;
}

export default function Banner(props: IbannerProps) {
  return <Wrapper>배너영역{props.children}</Wrapper>;
}
