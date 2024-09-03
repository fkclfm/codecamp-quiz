import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import {
  IMutation,
  IMutationLoginUserArgs,
} from "../../../../src/commons/types/generated/types";
import { useRouter } from "next/router";

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;

export default function LoginPage() {
  const router = useRouter();
  const [loginUser] = useMutation<
    Pick<IMutation, "loginUser">,
    IMutationLoginUserArgs
  >(LOGIN_USER);
  const { handleSubmit, register } = useForm();

  const onClickLogin = async (data: any) => {
    const result = await loginUser({
      variables: {
        email: data.email,
        password: data.password,
      },
    });
    router.push("/29/payment/loading");
  };
  return (
    <form onSubmit={handleSubmit(onClickLogin)}>
      <h1>로그인</h1>
      아이디: <input type="text" {...register("email")} /> <br />
      비밀번호: <input type="password" {...register("password")} /> <br />
      <button>로그인</button>
    </form>
  );
}
