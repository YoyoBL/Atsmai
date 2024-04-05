"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useParams, useRouter } from "next/navigation";

const BackBtn = () => {
   const router = useRouter();
   const { lang } = useParams();

   return (
      <button
         className="btn btn-circle btn-ghost btn-sm text-sm"
         onClick={router.back}
      >
         {lang === "en" ? (
            <ChevronLeftIcon className="size-6" />
         ) : (
            <ChevronRightIcon className="size-6" />
         )}
      </button>
   );
};

export default BackBtn;
