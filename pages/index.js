import Head from "next/head";
import { useQuery } from "urql";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Product from "../components/Product";
import { PRODUCT_QUERY } from "../lib/query";

export default function Home() {
  const [results] = useQuery({ query: PRODUCT_QUERY });
  const { data, fetching, error } = results;

  if (fetching)
    return (
      <div className="flex justify-center items-center">
        <Loader />
      </div>
    );
  if (error) return <p>Error...{error.message}</p>;
  // const products = data.products.data;
  const products = data?.products?.data;
  console.log(`product@@@@s`, products);

  return (
    <div>
      <Head>
        <title>Shu</title>
      </Head>
      <main className="w-full flex justify-center items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mt-3 md:mt-6">
          {products.map((product) => (
            <div key={product?.attributes?.slug} className="flex flex-wrap">
              <Product product={product?.attributes} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
