import { format, subDays } from "date-fns";

export function getYesterday() {
   return subDays(new Date(), 1);
}

export function getToday() {
   return new Date();
}

export function formatDate(date, template) {
   const formatted = format(date, template);
   return formatted;
}
