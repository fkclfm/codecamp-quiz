import { useRouter } from "next/router";
import { useEffect } from "react";

export const WithAuth = (Component: any) => (props: any) => {
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("accessToken") === null) {
      alert("로그인에 실패하였습니다. 다시 시도해주세요.");
      router.push("/26");
    }
  }, []);

  return <Component {...props} />;
};
