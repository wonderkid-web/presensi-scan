"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import React from "react";

function ButtonLogout() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/signin");
  };

  return (
    <button
      className="bg-red-500 text-white px-2 mt-2 mr-2 py-1 rounded hover:bg-red-700"
      onClick={() => handleLogout()}
    >
      logout
    </button>
  );
}

export default ButtonLogout;
