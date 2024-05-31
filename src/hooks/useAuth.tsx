// "use client";

import { useAuth } from "@/lib/zustand";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// import { supabase } from "@/lib/supabase";
// import { useRouter } from "next/navigation";
// import { useEffect, useLayoutEffect, useState } from "react";

// function useAuth() {
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const checkSession = async () => {
//       const { data, error } = await supabase.auth.getSession();
//       if (error || !data.session) {
//         router.refresh()
//       } else {
//         setUser(data.session.user);
//       }
//       setLoading(false);
//     };

//     checkSession();
//   }, []);

//   return { user, loading };
// }

// export default useAuth;

const useAuthChecker = () => {
  const router = useRouter();
  const { user, checkAuth } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push("/signin");
    }
  }, [router, user]);

  return user
};

export default useAuthChecker;
