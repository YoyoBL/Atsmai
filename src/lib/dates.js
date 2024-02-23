import { endOfMonth, format, startOfMonth, subDays } from "date-fns";

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

export function getStartOfMonth(month = new Date()) {
   return startOfMonth(month);
}

export function getEndOfMonth(month = new Date()) {
   return endOfMonth(month);
}
