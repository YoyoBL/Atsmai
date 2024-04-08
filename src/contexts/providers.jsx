"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

export function Providers({ children, session }) {
   return (
      <SessionProvider session={session}>
         {children}
         <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
               // Define default options
               className: "",
               duration: 5000,
            }}
         />
      </SessionProvider>
   );
}
