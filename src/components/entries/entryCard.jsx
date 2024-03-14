"use client";

import useQueryParams from "@/hooks/useQueryParams";
import { formatDate } from "@/lib/dates";
import Link from "next/link";

const EntryCard = ({ entry = {} }) => {
   if (!entry?._id) return;

   const { getPathWithNewParam } = useQueryParams();
   const { amount, category } = entry;
   const date = formatDate(entry.date, "dd/MM");
   return (
      <Link
         href={getPathWithNewParam("modal", entry._id)}
         className="card bg-base-100 px-3 cursor-pointer hover:bg-base-200 transition-colors duration-150"
      >
         <div className="p-3 flex flex-row justify-between items-center">
            <div className="text-base">{amount}</div>
            <div className="text-gray-500">{category}</div>
            <div className="text-gray-600 text-xs">{date}</div>
         </div>
      </Link>
   );
};

export default EntryCard;
