const clsx = require("clsx");
const { twMerge } = require("tailwind-merge");

export default function cn(...classes) {
   return twMerge(clsx(classes));
}
