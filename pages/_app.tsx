import { AppProps } from "next/app";
import Layout from "../src/components/commons/layout";
import { Global } from "@emotion/react";
import { globalStyles } from "../src/commons/styles/globalStyles";
import { RecoilRoot } from "recoil";
import { WithApollo } from "../src/components/commons/hocs/WithApollo";
import ApolloSetting from "../src/components/commons/apollo";

const App = ({ Component }: AppProps) => {
  return (
    <RecoilRoot>
      <ApolloSetting>
        <Global styles={globalStyles} />
        <Layout>
          <Component />
        </Layout>
      </ApolloSetting>
    </RecoilRoot>
  );
};

export default WithApollo(App);
