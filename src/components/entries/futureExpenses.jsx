"use client";
import cn from "@/lib/tailwindMerge";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import FutureExpenseCard from "./futureExpenseCard";
import { useParams } from "next/navigation";
import { MAIN_CURRENCY } from "@/constants";

const FutureExpenses = ({ recurring = [] }) => {
   const [flip, setFlip] = useState(false);
   const { lang } = useParams();
   const title = lang === "en" ? "Future Expenses" : "הוצאות עתידיות";

   if (!recurring.length) return;
   const totalFutureExpenses = recurring.reduce(
      (acc, cur) => acc + cur.amount,
      0
   );

   function handleFlip() {
      setFlip((flip) => !flip);
   }
   return (
      <div onClick={handleFlip} className="collapse bg-base-200">
         <input type="checkbox" className="min-h-0" />
         <div className="collapse-title text-gray-400  flex justify-between min-h-0 p-2">
            {title} - {totalFutureExpenses}
            {MAIN_CURRENCY}
            <label className={cn("swap swap-rotate", flip && "swap-active")}>
               <ChevronDownIcon className="swap-off h-5 w-5 " />
               <ChevronUpIcon className="swap-on h-5 w-5 " />
            </label>
         </div>
         <div className="collapse-content space-y-2">
            {recurring.map((r) => (
               <FutureExpenseCard key={r._id} entry={r} />
            ))}
         </div>
      </div>
   );
};

export default FutureExpenses;
