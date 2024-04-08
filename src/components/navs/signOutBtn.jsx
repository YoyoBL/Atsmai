"use client";

import { signIn, signOut } from "next-auth/react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

const SignOutBtn = () => {
   const { lang } = useParams();
   function handleSignOut() {
      signOut();
      toast.success("Signed Out");
   }

   return (
      <button
         onClick={handleSignOut}
         className="btn btn-neutral hover:btn-primary"
      >
         Sign out
      </button>
   );
};

export default SignOutBtn;
