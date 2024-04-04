"use client";

import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import useMonthPicker from "@/hooks/useMonthPicker";

const MonthsPicker = ({ months }) => {
   const {
      currentMonthString,
      currentYearString,
      yearString,
      routeToPreviousMonth,
      routeToNextMonth,
   } = useMonthPicker();

   return (
      <div className="card  bg-base-100 px-3 shadow">
         <div className="p-2 flex flex-row justify-between items-center">
            <Link
               href={routeToPreviousMonth}
               className="btn btn-ghost btn-circle btn-xs"
            >
               <ChevronLeftIcon className="rtl:hidden" />
               <ChevronRightIcon className="ltr:hidden" />
            </Link>
            <div className="text-center">
               <div className="text-lg">{months[currentMonthString]}</div>
               {yearString !== currentYearString && (
                  <div className="text-xs opacity-30">{yearString}</div>
               )}
            </div>
            <Link
               href={routeToNextMonth}
               className="btn btn-ghost btn-circle btn-xs"
            >
               <ChevronRightIcon className="rtl:hidden" />
               <ChevronLeftIcon className="ltr:hidden" />
            </Link>
         </div>
      </div>
   );
};

export default MonthsPicker;
