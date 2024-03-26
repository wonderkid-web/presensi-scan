"use client";

import React from "react";
import Lottie from "lottie-react";
import Gagal from "./gagal.json";
import Link from "next/link";

const App = () => (
  <div className="flex justify-center items-center flex-col gap-4">
    <Lottie animationData={Gagal} loop={true} />
    {Gagal && (
      <>
        <h1 className="text-3xl animate-bounce text-red-600">
          Proses Absen Gagal!
        </h1>
        <Link
          href={"/"}
          className="bg-red-600 p-3 rounded-md text-white hover:bg-red-700"
        >
          kembali
        </Link>
      </>
    )}
  </div>
);

export default App;
