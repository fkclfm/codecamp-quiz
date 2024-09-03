import ProductCreate from "../../../../src/units/products/08-write/productsCreate.container";
import { FETCH_PRODUCT } from "../../../../src/units/products/08-detail/productFetch.queries";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

export default function ProductsCreateMain() {
  const router = useRouter();

  const { data } = useQuery(FETCH_PRODUCT, {
    variables: { productId: router.query.product },
  });
  return <ProductCreate isEdit={true} data={data} />;
}
