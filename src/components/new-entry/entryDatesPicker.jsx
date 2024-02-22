"use client";

import { formatDate, getToday, getYesterday } from "@/lib/date";
import cn from "@/lib/tailwindMerge";

const EntryDatesPicker = ({ handleDate = () => {}, state = "" }) => {
   const isToday =
      formatDate(state, "yy-MM-dd") === formatDate(getToday(), "yy-MM-dd");
   const isYesterday =
      formatDate(state, "yy-MM-dd") === formatDate(getYesterday(), "yy-MM-dd");
   return (
      <div className="flex gap-3">
         {/* today */}
         <button
            type="button"
            onClick={() => handleDate(getToday())}
            className={cn("bg-base-100 btn btn-ghost", isToday && "bg-primary")}
            value={getToday()}
         >
            Today
         </button>

         {/* yesterday */}
         <button
            type="button"
            onClick={() => handleDate(getYesterday())}
            className={cn(
               "bg-base-100 btn btn-ghost",
               isYesterday && "btn-primary bg-primary"
            )}
         >
            Yesterday
         </button>

         {/* custom date */}
         <input
            type="date"
            name=""
            id=""
            onChange={(e) => handleDate(e.target.value)}
            className={cn(
               "btn bg-base-100",
               !isToday && !isYesterday && "btn-primary bg-primary"
            )}
         />
      </div>
   );
};

export default EntryDatesPicker;
