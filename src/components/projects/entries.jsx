"use client";

import { useState } from "react";
import EntryCard from "../entries/entryCard";
import cn from "@/lib/tailwindMerge";

const Entries = ({ entries = [], text }) => {
   const [filter, setFilter] = useState("all");

   function onFilterClick(filter) {
      setFilter(filter);
   }
   return (
      <div>
         {/* filter */}
         <div className=" grid grid-cols-3 p-2 justify-center gap-2 *:btn *:btn-outline *:btn-md md:*:btn-sm">
            <button
               onClick={() => onFilterClick("all")}
               className={cn(
                  filter === "all"
                     ? "btn-active"
                     : "opacity-70  hover:opacity-100"
               )}
            >
               {text.all}
            </button>
            <button
               onClick={() => onFilterClick("incomes")}
               className={cn(
                  "btn-primary",
                  filter === "incomes"
                     ? "btn-active"
                     : "opacity-70 hover:opacity-100"
               )}
            >
               {text.incomes}
            </button>
            <button
               onClick={() => onFilterClick("expenses")}
               className={cn(
                  "btn-secondary",
                  filter === "expenses"
                     ? "btn-active"
                     : "opacity-70 hover:opacity-100"
               )}
            >
               {text.expenses}
            </button>
         </div>

         {/* entries */}
         <div className="bg-base-300 p-2 rounded-xl space-y-2">
            {entries
               .filter((entry) => {
                  if (filter === "all") return entry;
                  if (filter === "incomes") return entry.entryType === "income";
                  if (filter === "expenses")
                     return entry.entryType === "expense";
               })
               .map((entry) => {
                  const outlineColor =
                     entry.entryType === "income"
                        ? "outline outline-1 outline-primary"
                        : "outline outline-1 outline-secondary";
                  return (
                     <EntryCard
                        key={entry._id}
                        entry={entry}
                        className={outlineColor}
                     />
                  );
               })}
         </div>
      </div>
   );
};

export default Entries;
