"use client";

import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import useQueryParams from "@/hooks/useQueryParams";
import cn from "@/lib/tailwindMerge";

const BottomNavbar = () => {
   const { lang } = useParams();
   const { getQueryByName } = useQueryParams();
   const entryType = getQueryByName("entriesType");

   const currentPath = usePathname();
   if (currentPath.includes("/new-entry")) return null;

   return (
      <div className="btm-nav sticky bottom-0 md:hidden border-black">
         <Link
            className={cn(
               "text-3xl text-black rounded-t-box transition-colors duration-150",
               entryType === "expenses" ? "bg-secondary" : "bg-primary"
            )}
            href={`/${lang}/new-entry?entryType=${entryType}`}
         >
            +
         </Link>
      </div>
   );
};

export default BottomNavbar;
