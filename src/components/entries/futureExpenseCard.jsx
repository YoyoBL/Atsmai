"use client";

import useQueryParams from "@/hooks/useQueryParams";
import { formatDate } from "@/lib/dates";
import Link from "next/link";
import { useParams } from "next/navigation";

const FutureExpenseCard = ({ entry = {} }) => {
   const { lang } = useParams();

   if (!entry?._id) return;

   let { amount, category } = entry;
   if (category.toLowerCase() === "general") {
      category = lang === "en" ? "general" : "כללי";
   }
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
