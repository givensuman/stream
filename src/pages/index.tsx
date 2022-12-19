import React from "react"
import { type NextPage } from "next";

import { trpc } from "@utils/trpc";
import useLog from "@hooks/useLog";

const Home: NextPage = () => {

  const { data, isLoading } = trpc.torrent.test.useQuery({})

  useLog(data)
  
  if (isLoading) return <h1>Loading...</h1>

  return (<>
      <div className="flex flex-col">
        {`Welcome (:`}
      </div>
  </>);
};

export default Home;

