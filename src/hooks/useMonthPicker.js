import "client-only";

import { formatDate } from "@/lib/dates";
import useQueryParams from "./useQueryParams";
import { add, format, parse, sub } from "date-fns";

const useMonthPicker = () => {
   const { searchParams, getPathWithNewParam } = useQueryParams();

   let currentMonth = searchParams.get("month");
   if (!currentMonth) {
      currentMonth = new Date();
   } else {
      currentMonth = parse(currentMonth, "MM-yy", new Date());
   }

   const previousMonth = sub(currentMonth, { months: 1 });
   const nextMonth = add(currentMonth, { months: 1 });

   const routeToPreviousMonth = getPathWithNewParam(
      "month",
      formatDate(previousMonth, "MM-yy")
   );
   const routeToNextMonth = getPathWithNewParam(
      "month",
      formatDate(nextMonth, "MM-yy")
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
