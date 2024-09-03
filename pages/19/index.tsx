import { gql, useQuery } from "@apollo/client";
import {
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../src/commons/types/generated/types";
import InfiniteScroll from "react-infinite-scroller";

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

export default function RefetchPagination() {
  const { data, fetchMore } = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS, {
    variables: {
      page: 1,
    },
  });

  const onLoadMore = () => {
    if (data === undefined) return;
    fetchMore({
      variables: { page: Math.ceil(data?.fetchBoards.length ?? 10 / 10) + 1 },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (fetchMoreResult === undefined) {
          return {
            fetchBoards: [...prev.fetchBoards],
          };
        }

        return {
          fetchBoards: [...prev.fetchBoards, ...fetchMoreResult.fetchBoards],
        };
      },
    });
  };

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={onLoadMore}
      hasMore={true}
      height={500}
    >
      {data?.fetchBoards?.map((el) => (
        <div key={el._id}>
          <span>작성자: {el.writer} </span>
          <span>제목: {el.title} </span>
          <span>내용: {el.contents} </span>
          <hr />
        </div>
      ))}
    </InfiniteScroll>
  );
}
