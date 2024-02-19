"use client";

import useQueryParams from "@/hooks/useQueryParams";
import cn from "@/lib/tailwindMerge";
import Link from "next/link";

const Tabs = () => {
   const { getPathWithNewParam, getQueryByName } = useQueryParams();
   const query = getQueryByName("entryType");

   return (
      <div role="tablist" className="tabs tabs-boxed">
         <Link
            href={getPathWithNewParam("entryType", "income")}
            role="tab"
            className={cn("tab", {
               "tab-active": query === "income" || !query,
            })}
         >
            Income
         </Link>
         <Link
            href={getPathWithNewParam("entryType", "expense")}
            role="tab"
            className={cn("tab", { "tab-active": query === "expense" })}
         >
            Expense
         </Link>
      </div>
   );
};

export default Tabs;
