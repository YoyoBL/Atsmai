"use client";

import cn from "@/lib/tailwindMerge";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useParams, useRouter } from "next/navigation";

const BackBtn = ({ className }) => {
   const router = useRouter();
   const { lang } = useParams();
   const text = lang === "en" ? "Back" : "חזור";

   return (
      <button
         className={cn("flex w-fit opacity-50 cursor-pointer", className)}
         onClick={router.back}
      >
         {lang === "en" ? (
            <ChevronLeftIcon className="size-6" />
         ) : (
            <ChevronRightIcon className="size-6" />
         )}
         {text}
      </button>
   );
};

export default BackBtn;
