import React, { useState } from "react"
import { type NextPage } from "next";
import clsx from "clsx";

import { trpc } from "@utils/trpc";
import tmdbImage from "@utils/tmdbImage";

import Search from "@components/Search";

const Home: NextPage = () => {

  const { data, isLoading } = trpc.tmdb.getTrending.useQuery({})

  return (<>
      <div className="flex flex-col">
        <Search
          placeholder="Search streaming collection"
        />
        {data?.results.map((item, index) => {
          return (
              <h1 key={item.id}>
                {item.name||item.title}
              </h1>
          )
        })}
      </div>
  </>);
};

export default Home;

