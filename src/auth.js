import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "@/actions/users.actions";
import { getServerSession } from "next-auth";
import { customFetch } from "./lib/customFetch";

export const authOptions = {
   session: {
      strategy: "jwt", // Use JWT for session management
   },
   providers: [
      CredentialsProvider({
         // The name to display on the sign in form (e.g. "Sign in with...")
         name: "Credentials",
         // `credentials` is used to generate a form on the sign in page.
         // You can specify which fields should be submitted, by adding keys to the `credentials` object.
         // e.g. domain, username, password, 2FA token, etc.
         // You can pass any HTML attribute to the <input> tag through the object.
         credentials: {
            email: {
               label: "Email",
               type: "email",
            },
            password: {
               label: "Password",
               type: "password",
               autoComplete: "current-password",
            },
         },
         async authorize(credentials, req) {
            // Add logic here to look up the user from the credentials supplied
            const res = await signIn(credentials);

            if (res.ok) {
               // Any object returned will be saved in `user` property of the JWT
               return res.data;
            } else {
               // If you return null then an error will be displayed advising the user to check their details.
               return null;

               // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
            }
         },
      }),
   ],
   callbacks: {
      async jwt({ user, account, token, trigger, session }) {
         if (trigger === "update" && token.name) {
            const {
               user: { id },
            } = await auth();
            const updated = await customFetch(`/api/users/${id}`);
            token.id = updated._id;
            token.role = updated.role;
            token.vat = updated.vat;
            token.name = [updated.firstName, updated.lastName].join(" ");
            token.lang = updated.lang;
         }
         if (account) {
            token.id = user._id;
            token.role = user.role;
            token.vat = user.vat;
            token.name = [user.firstName, user.lastName].join(" ");
            token.lang = user.lang;
         }
         return token;
      },
      async session({ session, token }) {
         session.user.id = token.id;
         session.user.vat = token.vat;
         session.user.role = token.role;
         session.user.lang = token.lang;

         return session;
      },
   },
};

export function auth(...args) {
   return getServerSession(...args, authOptions);
}
