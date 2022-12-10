import { type NextPage } from "next";
import Head from "next/head";

import TrendingCarousel from "@components/TrendingCarousel";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Movies</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col">
        <TrendingCarousel />
      </main>
    </>
  );
};

export default Home;

