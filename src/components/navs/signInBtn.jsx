"use client";

import { signIn } from "next-auth/react";
import { useParams } from "next/navigation";

const SignInBtn = () => {
   const { lang } = useParams();
   const text = lang === "en" ? "Sign In" : "התחברות";
   return (
      <button
         onClick={() => signIn(undefined, { callbackUrl: `/${lang}/` })}
         className="btn btn-primary"
      >
         {text}
      </button>
   );
};

export default SignInBtn;
