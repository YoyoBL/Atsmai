"use client";

import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

const BottomNavbar = () => {
   const { lang } = useParams();

   const currentPath = usePathname();
   if (currentPath.includes("/new-entry")) return null;

   return (
      <div className="btm-nav sticky bottom-0 md:hidden border-t border-black">
         <Link
            className="bg-primary text-3xl text-black"
            href={`/${lang}/new-entry`}
         >
            +
         </Link>
      </div>
   );
};

export default BottomNavbar;
