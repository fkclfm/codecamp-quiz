import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { schema } from "../../../src/commons/schema/register.schema";
import Input01 from "../../../src/components/commons/inputs/Input01";
import Button01 from "../../../src/components/commons/buttons/Button01";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      _id
      writer
      title
      contents
    }
  }
`;

// 캐시에 저장되는 데이터와 요청 후 받아오는 값이 일치되어야 합니다.
const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
    }
  }
`;
export default function reactHook() {
  const router = useRouter();
  const [createBoard] = useMutation(CREATE_BOARD);

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onClickSubmit = async (data: any) => {
    await createBoard({
      variables: {
        createBoardInput: {
          writer: data.writer,
          password: data.password,
          title: data.title,
          contents: data.contents,
        },
      },
      update(cache, { data }) {
        // 뮤테이션이 성공적으로 완료된 후 자동으로 호출되는 함수
        cache.modify({
          fields: {
            fetchBoards: (prev) => {
              // 캐시에 저장된 fetchBoards 필드를 수정
              return [data.createBoard, ...prev]; // 새로 생성된 게시글(data.createBoard)을 기존 게시글 목록(prev) 앞에 추가하여 새로운 배열을 반환
            },
          },
        });
      },
    });
    router.push("/28/apollo-cache-state-list");
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
