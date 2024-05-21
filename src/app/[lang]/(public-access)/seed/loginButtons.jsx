"use client";

import { signIn } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const LoginButtons = () => {
   const [loading, setLoading] = useState(false);
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
      setLoading(true);
      try {
         const res = await signIn("credentials", {
            ...credentials[user],
            redirect: false,
         });
         if (!res.ok) return toast.error("Error:", res.data);
         toast.success("Logged in");
         router.replace(`/${lang}/`);
         router.refresh();
      } catch (error) {
      } finally {
         setLoading(false);
      }
   }

   function btnContent(title) {
      return loading ? (
         <span className="loading loading-spinner loading-md"></span>
      ) : (
         title
      );
   }
   return (
      <div className="text-center mt-3">
         <h3 className="text-xl">Sign in as</h3>
         <div className="grid grid-cols-3 gap-3 justify-center mt-3 max-w-lg mx-auto">
            <button
               onClick={() => loginsAs("admin")}
               className="btn btn-primary"
            >
               {btnContent("Admin")}
            </button>
            <button
               onClick={() => loginsAs("userVAT")}
               className="btn btn-primary"
            >
               {btnContent("UserVAT")}
            </button>
            <button
               onClick={() => loginsAs("userNoVAT")}
               className="btn btn-primary"
            >
               {btnContent("UserNoVAT")}
            </button>
         </div>
      </div>
   );
};

export default LoginButtons;
