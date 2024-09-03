import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { schema } from "../../../src/commons/schema/register.schema";
import Input01 from "../../../src/components/commons/inputs/Input01";
import Button01 from "../../../src/components/commons/buttons/Button01";

export default function reactHook() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onClickSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onClickSubmit)}>
        작성자: <Input01 type="text" register={register("writer")} />
        <div>{formState.errors.writer?.message}</div>
        비밀번호: <Input01 type="password" register={register("password")} />
        <div>{formState.errors.password?.message}</div>
        제목: <Input01 type="text" register={register("title")} />
        <div>{formState.errors.title?.message}</div>
        내용: <Input01 type="text" register={register("contents")} />
        <div>{formState.errors.contents?.message}</div>
        <Button01 title="게시글 등록" isActive={formState.isValid}></Button01>
      </form>
    </>
  );
}
