"use client";

import useQueryParams from "@/hooks/useQueryParams";
import { formatDate } from "@/lib/dates";
import cn from "@/lib/tailwindMerge";
import Link from "next/link";
import { useParams } from "next/navigation";

const EntryCard = ({ entry = {}, className }) => {
   const { lang } = useParams();

   const { getPathWithNewParam } = useQueryParams();

   if (!entry?._id) return;
   let { amount, category } = entry;
   if (category.toLowerCase() === "general") {
      category = lang === "en" ? "general" : "כללי";
   }
   const date = formatDate(entry.date, "dd/MM");
   return (
      <Link
         href={getPathWithNewParam("modal", entry._id)}
         className={cn(
            "card bg-base-100 px-3 cursor-pointer hover:bg-base-200 transition-colors duration-150 ",
            className
         )}
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
