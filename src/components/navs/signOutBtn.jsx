"use client";

import { signIn, signOut } from "next-auth/react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

const SignOutBtn = () => {
   const { lang } = useParams();
   const text = lang === "en" ? "Sign Out" : "התנתקות";
   function handleSignOut() {
      signOut();
      toast.success("Signed Out");
   }

   return (
      <button
         onClick={handleSignOut}
         className="btn btn-neutral hover:btn-primary"
      >
         {text}
      </button>
   );
};

export default SignOutBtn;
