"use client";

import useQueryParams from "@/hooks/useQueryParams";
import { formatDate, getToday, getYesterday } from "@/lib/date";
import cn from "@/lib/tailwindMerge";
import { useRouter } from "next/navigation";

const EntryDatesPicker = () => {
   const { replace } = useRouter();
   const { getPathWithNewParam, getQueryByName } = useQueryParams();

   const initialState = getQueryByName("date") || "today";

   function handleClick(date) {
      const updatedPath = getPathWithNewParam("date", date);

      replace(updatedPath);
   }

   function handleChange(e) {
      const formattedDate = formatDate(e.target.value, "yy-MM-dd");
      handleClick(formattedDate);
   }
   return (
      <div className="flex gap-3">
         {/* today */}
         <button
            onClick={(e) => {
               e.preventDefault();
               handleClick(getToday());
            }}
            className={cn(
               "btn btn-base-100",
               (initialState === "today" || initialState === getToday()) &&
                  "btn-primary"
            )}
         >
            Today
         </button>

         {/* yesterday */}
         <button
            onClick={(e) => {
               e.preventDefault();
               handleClick(getYesterday());
            }}
            className={cn(
               "btn bg-base-100",
               initialState === getYesterday() && "btn-primary bg-primary"
            )}
         >
            Yesterday
         </button>

         {/* custom date */}
         <input
            type="date"
            name=""
            id=""
            onChange={handleChange}
            className={cn(
               "btn bg-base-100",
               initialState !== getToday() &&
                  initialState !== "today" &&
                  initialState !== getYesterday() &&
                  "btn-primary bg-primary"
            )}
         />
      </div>
   );
};

export default EntryDatesPicker;
