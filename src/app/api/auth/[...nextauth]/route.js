import { signIn } from "@/actions/users.action";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
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
            password: { label: "Password", type: "password" },
         },
         async authorize(credentials, req) {
            // Add logic here to look up the user from the credentials supplied
            const res = await signIn(credentials);

            if (res.ok) {
               // Any object returned will be saved in `user` property of the JWT
               return res.data;
            } else {
               // If you return null then an error will be displayed advising the user to check their details.
               console.log(res.data);
               return null;

               // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
            }
         },
      }),
   ],
   callbacks: {
      async jwt({ user, account, profile, token }) {
         if (account) {
            token.role = user.role;
            token.name = [user.firstName, user.lastName].join(" ");
         }
         console.log("token:", token);
         return token;
      },
   },
});

export { handler as GET, handler as POST };
