import { gql, useQuery } from "@apollo/client";
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

const FETCH_BOARDS_COUNT = gql`
  query fetchBoardsCount {
    fetchBoardsCount
  }
`;

export default function RefetchPagination() {
  const [startPage, setStartPage] = useState(1);
  const [isActive, setIsActive] = useState(false);
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
