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
            containerClassName="oklch(var(--b3))"
            toastOptions={{
               className: "text-lg",
               style: {
                  background: "oklch(var(--b3))",
                  color: "oklch(var(--bc))",
               },
               duration: 5000,
            }}
         />
      </SessionProvider>
   );
}
