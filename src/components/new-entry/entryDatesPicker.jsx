"use client";

import { formatDate, getToday, getYesterday } from "@/lib/dates";
import cn from "@/lib/tailwindMerge";

const EntryDatesPicker = ({
   handleDate = () => {},
   form = "",
   color = "",
   text = {},
}) => {
   const colorCondition = form.entryType === "income";
   const selectedDate = form.date;
   const isToday =
      formatDate(selectedDate, "yy-MM-dd") ===
      formatDate(getToday(), "yy-MM-dd");
   const isYesterday =
      formatDate(selectedDate, "yy-MM-dd") ===
      formatDate(getYesterday(), "yy-MM-dd");
   return (
      <div className="flex gap-1">
         {/* today */}
         <button
            type="button"
            onClick={() => handleDate(getToday())}
            className={cn(
               "btn",
               isToday
                  ? `${
                       colorCondition ? "btn-primary" : "btn-secondary"
                    } text-white`
                  : "btn-ghost bg-base-100"
            )}
            value={getToday()}
         >
            {text.today}
         </button>

         {/* yesterday */}
         <button
            type="button"
            onClick={() => handleDate(getYesterday())}
            className={cn(
               "btn",
               isYesterday
                  ? `${
                       colorCondition ? "btn-primary" : "btn-secondary"
                    } text-white`
                  : "btn-ghost bg-base-100"
            )}
         >
            {text.yesterday}
         </button>

         {/* custom date */}
         <input
            type="date"
            value={formatDate(selectedDate, "yyyy-MM-dd")}
            onChange={(e) => handleDate(e.target.value)}
            className={cn(
               "btn",
               !isToday && !isYesterday
                  ? `btn-${color} text-white`
                  : "btn-ghost bg-base-100"
            )}
         />
      </div>
   );
};

export default EntryDatesPicker;
