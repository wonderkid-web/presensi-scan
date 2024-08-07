import { supabase } from "@/lib/supabase";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: AuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.

      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        if (credentials) {
          try {

            // if(!credentials.email.includes("admin")){
            //   return null
            // }

            const { data } = await supabase.auth.signInWithPassword({
              email: "admin@test.com",
              password: credentials.password,
            });

            if (credentials.email === "00000" && credentials.password === "admin123") {
              return data.user;
            }
          } catch (error) {
            return null;
          }
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user
        return { ...token };
      }
      return token;
    },

    async session({ session, token }) {
      return { ...session, ...token };
    },
  },
};
