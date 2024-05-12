"use client";

import useQueryParams from "@/hooks/useQueryParams";
import { formatDate } from "@/lib/dates";
import cn from "@/lib/tailwindMerge";
import Link from "next/link";
import { useParams } from "next/navigation";

const currentDate = formatDate(new Date(), "MM-yy");

const Tabs = ({ text: entriesPage }) => {
   const { lang } = useParams();
   const { getQueryByName } = useQueryParams();
   const entriesType = getQueryByName("entriesType");

   return (
      <div className="grid grid-cols-2 translate-y-[1px] text-center text-lg">
         <Link
            href={`/${lang}?entriesType=incomes&month=${currentDate}`}
            className={cn("p-2 ", {
               "bg-primary rounded-t-xl text-white": entriesType === "incomes",
            })}
            prefetch={true}
         >
            {entriesPage.incomesTab}
         </Link>

         <Link
            href={`/${lang}?entriesType=expenses&month=${currentDate}`}
            className={cn("p-2", {
               "bg-secondary rounded-t-xl text-white":
                  entriesType === "expenses",
            })}
            prefetch={true}
         >
            {entriesPage.expensesTab}
         </Link>
      </div>
   );
};

export default Tabs;
