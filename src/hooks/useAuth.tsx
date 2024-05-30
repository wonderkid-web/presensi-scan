"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";

function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useLayoutEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) {
        router.refresh()
      } else {
        setUser(data.session.user);
      }
      setLoading(false);
    };

    checkSession();
  }, [router]);

  return { user, loading };
}

export default useAuth;
