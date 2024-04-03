"use client";

import { signIn } from "next-auth/react";
import { useParams } from "next/navigation";

const SignInBtn = () => {
   const { lang } = useParams();
   return (
      <button
         onClick={() => signIn(undefined, { callbackUrl: `/${lang}/` })}
         className="btn btn-primary"
      >
         Sign In
      </button>
   );
};

export default SignInBtn;
