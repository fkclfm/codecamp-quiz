import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { FETCH_PRODUCT, DELETE_PRODUCT } from "./productFetch.queries";
import ProductFetchUI from "./productFetch.presenter";

export default function ProductFetch() {
  const router = useRouter();
  const [deleteProduct] = useMutation(DELETE_PRODUCT);
  const { data } = useQuery(FETCH_PRODUCT, {
    variables: { productId: router.query.product },
  });

  console.log(data);
  const onClickDelete = (event) => {
    deleteProduct({
      variables: { productId: event.target.id },
      refetchQueries: [
        {
          query: FETCH_PRODUCT,
          variables: { page: Number(router.query.product) },
        },
      ],
    });
  };

  const onEdit = () => {
    router.push(`/08/${router.query.product}/edit`);
  };
  return (
    <ProductFetchUI data={data} onClickDelete={onClickDelete} onEdit={onEdit} />
  );
}
