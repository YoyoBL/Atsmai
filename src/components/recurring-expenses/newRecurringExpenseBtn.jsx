"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import useQueryParams from "@/hooks/useQueryParams";

const NewRecurringExpenseBtn = () => {
   const { getPathWithNewParam } = useQueryParams();
   return (
      <>
         <Link
            href={getPathWithNewParam("modal", "show")}
            className="btn btn-outline btn-circle p-4 size-20"
         >
            <PlusIcon />
         </Link>
      </>
   );
};

export default NewRecurringExpenseBtn;
