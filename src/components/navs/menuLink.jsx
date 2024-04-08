"use client";

import cn from "@/lib/tailwindMerge";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const MenuLink = ({ link }) => {
   const path = usePathname();
   const { lang } = useParams();
   const currentPath = path.split("/")[2] || "";
   const isCurrentPath = currentPath === link.href;

   return (
      <li>
         <Link
            onClick={closeSidebar}
            href={`/${lang}/${link.href}`}
            className={cn(
               "flex gap-3 p-3 hover:bg-base-300 rounded-xl",
               isCurrentPath && "bg-base-100 font-bold"
            )}
         >
            {link.icon}
            {link.title}
         </Link>
      </li>
   );
};

export default MenuLink;

function closeSidebar() {
   const checkbox = document.getElementById("my-drawer-2");
   const checked = checkbox.checked;
   checkbox.checked = !checked;
}
