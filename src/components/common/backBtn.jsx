"use client";

import useModal from "@/hooks/useModal";
import cn from "@/lib/tailwindMerge";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useParams } from "next/navigation";

const BackBtn = ({ className }) => {
   const { lang } = useParams();
   const { closeQueryModal } = useModal();
   const text = lang === "en" ? "Back" : "חזור";

   return (
      <button
         className={cn("flex w-fit opacity-50 cursor-pointer", className)}
         onClick={closeQueryModal}
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
