"use client";

import useQueryParams from "@/hooks/useQueryParams";
import cn from "@/lib/tailwindMerge";
import Link from "next/link";
import { useParams } from "next/navigation";

const Tabs = ({ text: entriesPage }) => {
   const { lang } = useParams();
   const { getQueryByName } = useQueryParams();
   const entriesType = getQueryByName("entriesType");

   return (
      <div className="grid grid-cols-2 relative  bg-base-200 text-center text-lg">
         <Link
            href={`/${lang}?entriesType=incomes`}
            className={cn("p-2 ", {
               "bg-primary rounded-t-xl text-white": entriesType === "incomes",
            })}
         >
            {entriesPage.incomesTab}
         </Link>

         <Link
            href={`/${lang}?entriesType=expenses`}
            className={cn("p-2", {
               "bg-secondary rounded-t-xl text-white":
                  entriesType === "expenses",
            })}
         >
            {entriesPage.expensesTab}
         </Link>
      </div>
   );
};

export default Tabs;
