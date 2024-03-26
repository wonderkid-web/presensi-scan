"use client"

import React from "react";
import Lottie from "lottie-react";
import Sukses from "./sukses.json"
import Link from "next/link";

const App = () => <div className="flex justify-center items-center flex-col gap-4">
     <Lottie animationData={Sukses}  loop={true} />
     <h1 className="text-3xl animate-bounce text-green-600">Proses Absen Berhasil</h1>
     <Link href={'/'} className="bg-green-600 p-3 rounded-md text-white hover:bg-green-700">kembali</Link>
</div>;

export default App;