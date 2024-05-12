"use client";

import useModal from "@/hooks/useModal";
import useQueryParams from "@/hooks/useQueryParams";
import cn from "@/lib/tailwindMerge";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useParams, useRouter } from "next/navigation";

const BackBtn = ({ className }) => {
   const { lang } = useParams();
   const router = useRouter();
   const { closeQueryModal } = useModal();
   const { getQueryByName } = useQueryParams();
   const text = lang === "en" ? "Back" : "חזור";

   function closeModal() {
      const isQueryModal = getQueryByName("modal");
      if (isQueryModal) return closeQueryModal();

      router.back();
   }

   return (
      <button
         className={cn("flex w-fit opacity-50 cursor-pointer", className)}
         onClick={closeModal}
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
