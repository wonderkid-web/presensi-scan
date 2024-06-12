"use client";

import { supabase } from "@/lib/supabase";
import { signOut } from "next-auth/react";
import React from "react";

function ButtonLogout() {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    await signOut();
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
