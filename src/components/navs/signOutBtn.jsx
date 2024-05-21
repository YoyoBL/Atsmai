"use client";

import { signIn, signOut } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { closeSidebar } from "./menuLink";

const SignOutBtn = () => {
   const { lang } = useParams();
   const router = useRouter();
   const text = lang === "en" ? "Sign Out" : "התנתקות";
   async function handleSignOut() {
      try {
         const res = await signOut({
            redirect: false,
            callbackUrl: `/${lang}/welcome`,
         });
         toast.success("Signed Out");
         router.replace(res.url);
         closeSidebar();
         router.refresh();
      } catch (error) {
         toast.error("Error");
         console.log(error);
      }
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
