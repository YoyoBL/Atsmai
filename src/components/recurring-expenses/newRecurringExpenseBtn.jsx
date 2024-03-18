"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import NewRecurringExpense from "./newRecurringExpense";
import useQueryParams from "@/hooks/useQueryParams";
import Modal from "../common/modal";

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

         <Modal>
            <NewRecurringExpense />
         </Modal>
      </>
   );
};

export default NewRecurringExpenseBtn;
