"use client";

import { deleteRecurringExpense } from "@/actions/recurringExpense.actions";
import useQueryParams from "@/hooks/useQueryParams";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { TrashIcon } from "@heroicons/react/24/outline";

const DeleteRecurring = () => {
   function openModal() {
      const modal = document.getElementById("confirm-delete");
      modal.showModal();
   }

   return (
      <>
         <button
            onClick={openModal}
            className="btn btn-md btn-circle btn-outline btn-neutrals"
         >
            <TrashIcon className="h-6 w-6" />
         </button>
      </>
   );
};

export default DeleteRecurring;
