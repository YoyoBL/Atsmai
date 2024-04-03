"use client";

import { signIn, signOut } from "next-auth/react";
import { useParams } from "next/navigation";

const SignOutBtn = () => {
   const { lang } = useParams();
   return (
      <button
         onClick={() => signOut({ callbackUrl: `/${lang}/` })}
         className="btn btn-neutral hover:btn-primary"
      >
         Sign out
      </button>
   );
};

export default SignOutBtn;
