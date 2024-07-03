import "client-only";

import { formatDate, today } from "@/lib/dates";
import useQueryParams from "./useQueryParams";
import { add, format, isSameMonth, parse, sub } from "date-fns";

const useMonthPicker = () => {
   const { searchParams, getPathWithNewParam } = useQueryParams();

   let currentMonth = searchParams.get("month");
   if (!currentMonth || currentMonth === "current") {
      currentMonth = today;
   } else {
      currentMonth = parse(currentMonth, "MM-yy", new Date());
   }

   let previousMonth = sub(currentMonth, { months: 1 });
   let nextMonth = add(currentMonth, { months: 1 });

   const routeToPreviousMonth = getPathWithNewParam(
      "month",
      isSameMonth(previousMonth, today)
         ? "current"
         : formatDate(previousMonth, "MM-yy")
   );
   const routeToNextMonth = getPathWithNewParam(
      "month",
      isSameMonth(nextMonth, today) ? "current" : formatDate(nextMonth, "MM-yy")
   );

   const currentMonthString = format(currentMonth, "MMMM");
   const previousMonthMonthString = format(previousMonth, "MMMM");
   const nextMonthMonthString = format(nextMonth, "MMMM");
   const currentYearString = format(new Date(), "yyyy");
   const yearString = format(currentMonth, "yyyy");

   return {
      currentMonth,
      previousMonth,
      nextMonth,
      routeToPreviousMonth,
      routeToNextMonth,
      currentMonthString,
      previousMonthMonthString,
      nextMonthMonthString,
      currentYearString,
      yearString,
   };
};

export default useMonthPicker;
