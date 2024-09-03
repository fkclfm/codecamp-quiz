import { gql, useMutation } from "@apollo/client";
import dynamic from "next/dynamic";
import router from "next/router";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import { register } from "ts-node";

const ReactQuill = dynamic(async () => await import("react-quill"), {
  ssr: false,
});

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

export default function WebEditor() {
  const { register, handleSubmit, setValue } = useForm({
    mode: "onChange",
  });
  const [createBoard] = useMutation(CREATE_BOARD);
  const handleChange = (value: string) => {
    setValue("contents", value !== "<p><br></p>" ? value : "");
    console.log(value);
  };

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
    <form onSubmit={handleSubmit(onClickSubmit)}>
      작성자: <input type="text" {...register("writer")} /> <br />
      비밀번호: <input type="password" {...register("password")} /> <br />
      제목: <input type="text" {...register("title")} /> <br />
      내용: <ReactQuill onChange={handleChange} /> <br />
      <button>제출</button>
    </form>
  );
}
