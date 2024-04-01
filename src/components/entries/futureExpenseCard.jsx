"use client";

import useQueryParams from "@/hooks/useQueryParams";
import { formatDate } from "@/lib/dates";
import Link from "next/link";

const FutureExpenseCard = ({ entry = {} }) => {
   if (!entry?._id) return;

   // const { getPathWithNewParam } = useQueryParams();
   const { amount, category } = entry;
   const date = formatDate(entry.nextOccurrence, "dd/MM");
   return (
      <Link
         href={""}
         className="card bg-base-100 px-3 cursor-pointer hover:bg-base-300 transition-colors duration-150"
      >
         <div className="p-3 flex flex-row justify-between items-center">
            <div className="text-base">{amount}</div>
            <div className="text-gray-500">{category}</div>
            <div className="text-gray-600 text-xs">{date}</div>
         </div>
      </Link>
   );
};

export default FutureExpenseCard;
