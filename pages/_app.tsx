import { AppProps } from "next/app";
import ApolloSetting from "../src/commons/apollo";

export default function App({ Component }: AppProps) {
  return (
    <ApolloSetting>
      <Component />;
    </ApolloSetting>
  );
}
