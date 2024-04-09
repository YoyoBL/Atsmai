"use client";

import { signIn } from "next-auth/react";
import { useParams } from "next/navigation";

const SignInBtn = ({ text }) => {
   if (!text) return null;
   const { lang } = useParams();
   return (
      <button
         onClick={() => signIn(undefined, { callbackUrl: `/${lang}/` })}
         className="btn btn-primary"
      >
         {text.signIn}
      </button>
   );
};

export default SignInBtn;
