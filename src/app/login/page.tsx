"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type LoginForm = {
  email: string;
  password: string;
};

export default function Page() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const { handleSubmit, register } = useForm<LoginForm>();

  async function getUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    return user;
  }

//   const { data: user, isLoading } = useQuery({
//     queryFn: getUser,
//     queryKey: ["user"],
//   });

  const onSubmit = async ({ email, password }: LoginForm) => {
    console.log(email, password)
    // try {
    //   await supabase.auth.signUp({
    //     email,
    //     password,
    //     options: {
    //       emailRedirectTo: `${location.origin}/auth/callback`,
    //     },
    //   });

    //   router.refresh();
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const onSignIn = async ({ email, password }: LoginForm) => {
    console.log(email, password)
    const supabasee = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
    try {
      const { data, error }= await supabasee.auth.signInWithPassword({
        email:"mwahyuap2018@gmail.com",
        password:"wahyur2416",
      });

      console.log(data, error)

      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

//   if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="grid grid-cols-2 place-content-center min-h-screen">
      {/* <pre className="col-span-2 justify-self-center self-center">{JSON.stringify(user, null, 2)}</pre> */}

      {/* <form
        className="flex flex-col gap-4 justify-center items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className="py-1 px-2"
          type="text"
          placeholder="email"
          {...register("email")}
        />
        <input
          className="py-1 px-2"
          type="password"
          placeholder="password"
          {...register("password")}
        />

        <button type="submit">signup</button>
      </form> */}

      <form
        className="flex flex-col gap-4 justify-center items-center"
        onSubmit={handleSubmit(onSignIn)}
      >
        <input
          className="py-1 px-2"
          type="text"
          placeholder="email"
          {...register("email")}
        />
        <input
          className="py-1 px-2"
          type="password"
          placeholder="password"
          {...register("password")}
        />

        <button type="submit">signin</button>
      </form>
    </div>
  );
}
