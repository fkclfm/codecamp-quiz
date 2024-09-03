import { gql, useMutation, useQuery } from "@apollo/client";
import {
  IQuery,
  IQueryFetchBoardsArgs,
  IQueryFetchBoardsCountArgs,
} from "../../src/commons/types/generated/types";
import { MouseEvent, useState } from "react";

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      _id
      writer
      title
    }
  }
`;

const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

const FETCH_BOARDS_COUNT = gql`
  query fetchBoardsCount {
    fetchBoardsCount
  }
`;

export default function RefetchPagination() {
  const [startPage, setStartPage] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const [deleteBoard] = useMutation(DELETE_BOARD);
  const { data, refetch } = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS, {
    variables: {
      page: 1,
    },
  });

  const { data: dataBoardsCount } = useQuery<
    Pick<IQuery, "fetchBoardsCount">,
    IQueryFetchBoardsCountArgs
  >(FETCH_BOARDS_COUNT);
  const lastPage = Math.ceil(dataBoardsCount?.fetchBoardsCount / 10);

  const onClickDelete = async (event) => {
    await deleteBoard({
      variables: {
        boardId: event?.currentTarget.id,
      },
      update(cache, { data }) {
        // 뮤테이션이 성공적으로 완료된 후 자동으로 호출되는 함수
        cache.modify({
          fields: {
            fetchBoards: (prev, { readField }) => {
              // 캐시의 fetchBoards 필드를 수정
              const deletedId = data.deleteBoard; // 삭제된 게시글의 ID를 가져옴

              // 캐시에서 삭제된 ID와 일치하지 않는 게시글들만 남기기
              const filteredPrev = prev.filter(
                (el) => readField("_id", el) !== deletedId, // 각 게시글의 ID를 읽어서 삭제된 ID와 비교
              );
              return [...filteredPrev]; // 삭제된 게시글을 제외한 새로운 배열을 반환
            },
          },
        });
      },
    });
  };

  const onClickPrevPage = () => {
    if (startPage === 1) {
      alert("마지막 페이지입니다.");
      return;
    }
    setStartPage((prev) => prev - 10);
  };

  const onClickNextPage = () => {
    if (lastPage < startPage + 10) {
      setIsActive((prev) => prev);
      return;
    }
    setStartPage((prev) => prev + 10);
  };

  const onClickPage = (event: MouseEvent<HTMLButtonElement>) => {
    refetch({ page: Number(event.currentTarget.id) });
  };

  return (
    <div>
      {data?.fetchBoards?.map((el) => (
        <div key={el._id}>
          {el.title} {el.writer}
          <button id={el._id} onClick={onClickDelete}>
            X
          </button>
          <hr />
        </div>
      ))}
      <span onClick={onClickPrevPage}>&lt;</span>
      {new Array(10).fill(1).map(
        (_, index) =>
          index + startPage <= lastPage && (
            <button
              onClick={onClickPage}
              id={String(index + startPage)}
              key={index + startPage}
              disabled={isActive}
            >
              {` ${index + startPage} `}
            </button>
          ),
      )}
      <span onClick={onClickNextPage}>&gt;</span>
    </div>
  );
}
