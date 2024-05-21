"use client";

import { signIn } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LoginButtons = () => {
   const router = useRouter();
   const { lang } = useParams();
   const credentials = {
      admin: {
         email: "admin@gmail.com",
         password: "Aa123456@",
      },
      userVAT: {
         email: "uservat@gmail.com",
         password: "Aa123456@",
      },
      userNoVAT: {
         email: "usernovat@gmail.com",
         password: "Aa123456@",
      },
   };
   async function loginsAs(user) {
      const res = await signIn("credentials", {
         ...credentials[user],
         redirect: false,
      });
      if (!res.ok) return toast.error("Error:", res.data);
      toast.success("Logged in");
      router.replace(`/${lang}/`);
      router.refresh();
   }
   return (
      <div className="text-center mt-3">
         <h3 className="text-xl">Sign in as</h3>
         <div className="flex gap-3 justify-center mt-3">
            <button
               onClick={() => loginsAs("admin")}
               className="btn btn-primary"
            >
               Admin
            </button>
            <button
               onClick={() => loginsAs("userVAT")}
               className="btn btn-primary"
            >
               UserVAT
            </button>
            <button
               onClick={() => loginsAs("userNoVAT")}
               className="btn btn-primary"
            >
               UserNoVAT
            </button>
         </div>
      </div>
   );
};

export default LoginButtons;
