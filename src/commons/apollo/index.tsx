import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
interface IApolloProps {
  children: any;
}
export default function ApolloSetting(props: IApolloProps) {
  const client = new ApolloClient({
    uri: "http://backend-example.codebootcamp.co.kr/graphql",
    cache: new InMemoryCache(), // 컴퓨터의 메모리에다가 백엔드에서 받아온 데이터 임시로 저장해 놓기
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
