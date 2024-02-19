import { format, subDays } from "date-fns";

export function getYesterday() {
   const yesterday = subDays(new Date(), 1);
   const formatted = format(yesterday, "yy-MM-dd");
   return formatted;
}

export function getToday() {
   const today = new Date();
   const formatted = format(today, "yy-MM-dd");
   return formatted;
}

export function formatDate(date, template) {
   const formatted = format(date, template);
   return formatted;
}
