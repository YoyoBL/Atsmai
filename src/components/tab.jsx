"use client";

import cn from "@/lib/tailwindMerge";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const Tab = () => {
   const searchParams = useSearchParams();
   const currentTab = searchParams.get("tab");
   console.log(searchParams.toString());
   return (
      <div role="tablist" className="tabs tabs-boxed">
         <Link
            href={"/?tab=1"}
            role="tab"
            className={cn("tab", { "tab-active": currentTab === "1" })}
         >
            Tab 1
         </Link>
         <Link
            href={"/?tab=2"}
            role="tab"
            className={cn("tab", { "tab-active": currentTab === "2" })}
         >
            Tab 2
         </Link>
         <Link
            href={"/?tab=3"}
            role="tab"
            className={cn("tab", { "tab-active": currentTab === "3" })}
         >
            Tab 3
         </Link>
      </div>
   );
};

export default Tab;
