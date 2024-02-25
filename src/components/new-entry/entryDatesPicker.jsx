"use client";

import { formatDate, getToday, getYesterday } from "@/lib/dates";
import cn from "@/lib/tailwindMerge";

const EntryDatesPicker = ({
   handleDate = () => {},
   state = "",
   color = "primary",
}) => {
   const isToday =
      formatDate(state, "yy-MM-dd") === formatDate(getToday(), "yy-MM-dd");
   const isYesterday =
      formatDate(state, "yy-MM-dd") === formatDate(getYesterday(), "yy-MM-dd");
   return (
      <div className="flex gap-1">
         {/* today */}
         <button
            type="button"
            onClick={() => handleDate(getToday())}
            className={cn(
               "btn",
               isToday ? `btn-${color} text-white` : "btn-ghost bg-base-100"
            )}
            value={getToday()}
         >
            Today
         </button>

         {/* yesterday */}
         <button
            type="button"
            onClick={() => handleDate(getYesterday())}
            className={cn(
               "btn",
               isYesterday ? `btn-${color} text-white` : "btn-ghost bg-base-100"
            )}
         >
            Yesterday
         </button>

         {/* custom date */}
         <input
            type="date"
            value={formatDate(state, "yyyy-MM-dd")}
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
