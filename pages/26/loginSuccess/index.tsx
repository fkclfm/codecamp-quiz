import { gql, useQuery } from "@apollo/client";
import { IQuery } from "../../../src/commons/types/generated/types";
import { WithAuth } from "../../../src/components/commons/hocs/WithAuth";

const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      email
      name
    }
  }
`;

const LoginPage = () => {
  const { data } =
    useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);
  console.log(data);
  return <>{data?.fetchUserLoggedIn.name}님 환영합니다!!!</>;
};

export default WithAuth(LoginPage);
