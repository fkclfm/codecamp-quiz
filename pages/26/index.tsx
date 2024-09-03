import { gql, useMutation } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import {
  IMutation,
  IMutationLoginUserArgs,
} from "../../src/commons/types/generated/types";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { accessTokenState } from "../../src/commons/stores/globalState";

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;

export default function LoginPage() {
  const router = useRouter();
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser] = useMutation<
    Pick<IMutation, "loginUser">,
    IMutationLoginUserArgs
  >(LOGIN_USER);

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const onClickLogin = async () => {
    try {
      const result = await loginUser({
        variables: { email, password },
      });
      const accessToken = result.data?.loginUser.accessToken;
      if (accessToken === undefined) {
        alert("로그인에 실패하였습니다.");
        return;
      }
      setAccessToken(accessToken);
      localStorage.setItem("accessToken", accessToken);
      router.push("/26/loginSuccess");
    } catch (error) {
      if (error instanceof Error) alert("로그인에 실패하였습니다.");
    }
  };

  return (
    <>
      <input type="text" onChange={onChangeEmail} />
      <input type="password" onChange={onChangePassword} />
      <button onClick={onClickLogin}>로그인 버튼</button>
    </>
  );
}
