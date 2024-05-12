"use client";

import useQueryParams from "@/hooks/useQueryParams";
import { format } from "date-fns";

const IsCurrentMonth = ({ children }) => {
   const { getQueryByName } = useQueryParams();
   const selectedMonth = getQueryByName("month");
   const currentMonth = format(new Date(), "MM-yy");
   const isCurrentMonth = selectedMonth === currentMonth;
   if (!isCurrentMonth) return null;
   return children;
};

export default IsCurrentMonth;
