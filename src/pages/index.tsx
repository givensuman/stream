import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { trpc } from "@utils/trpc";

import RouteButton from "@components/RouteButton";
import { FaTv, FaFilm } from 'react-icons/fa'

const Home: NextPage = () => {

  const { data, isLoading } = trpc.tmdb.getTrending.useQuery({})

  return (<>
      <div className="">
      asdasd
      </div>
  </>);
};

export default Home;

