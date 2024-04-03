"use client";

import { signIn, signOut } from "next-auth/react";
import { useParams } from "next/navigation";

const SignOut = () => {
   const { lang } = useParams();
   return (
      <button
         onClick={signOut({ callbackUrl: `/${lang}/` })}
         className="btn btn-primary"
      >
         Sign In
      </button>
   );
};

export default SignOut;
