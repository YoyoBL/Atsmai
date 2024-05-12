"use client";

import Link from "next/link";
import { closeSidebar } from "../navs/menuLink";
import { useSession } from "next-auth/react";

const Avatar = () => {
   const {
      data: { user },
   } = useSession();
   if (!user) return null;
   const splitName = user.name.split(" ");
   const initials = splitName[0][0] + splitName[1][0];

   return (
      <Link href={`profile`} onClick={closeSidebar} prefetch={true}>
         <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content rounded-full w-20">
               <span className="text-3xl">{initials}</span>
            </div>
         </div>
      </Link>
   );
};

export default Avatar;
