import { type AppType } from "next/app"
import Head from "next/head"

import { trpc } from "../utils/trpc"

import Navbar from "@components/Navbar"

import "../styles/globals.css"

const MyApp: AppType = ({ Component, pageProps }) => {
  return (<>
  
    <Head>
          <title>stream</title>
          <meta name="description" content="" />
          <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className="flex flex-col items-center min-h-screen bg-slate-700 text-slate-200 min-w-screen overflow-hidden">   
      <Navbar />
      <div className="max-w-4xl mt-12">
        <Component {...pageProps} />
      </div>
    </main>
  
  </>)
}

export default trpc.withTRPC(MyApp)
