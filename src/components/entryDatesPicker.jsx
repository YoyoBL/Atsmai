"use client";

import useQueryParams from "@/hooks/useQueryParams";
import { formatDate, getToday, getYesterday } from "@/lib/date";
import { useRouter } from "next/navigation";

const EntryDatesPicker = () => {
   const { replace } = useRouter();
   const { getPathWithNewParam } = useQueryParams();

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
            className="btn bg-base-100"
         >
            Today
         </button>

         {/* yesterday */}
         <button
            className="btn bg-base-100"
            onClick={(e) => {
               e.preventDefault();
               handleClick(getYesterday());
            }}
         >
            Yesterday
         </button>

         {/* custom date */}
         <input
            type="date"
            name=""
            id=""
            className="btn bg-base-100"
            onChange={handleChange}
         />
      </div>
   );
};

export default EntryDatesPicker;
