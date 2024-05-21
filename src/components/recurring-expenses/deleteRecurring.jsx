"use client";

import { TrashIcon } from "@heroicons/react/24/outline";
import { openModalDOM } from "@/lib/modalTools";

const DeleteRecurring = () => {
   const modalId = "confirm-delete";

   return (
      <>
         <button
            onClick={() => openModalDOM(modalId)}
            className="btn btn-md btn-circle btn-outline btn-neutrals"
         >
            <TrashIcon className="h-6 w-6" />
         </button>
      </>
   );
};

export default DeleteRecurring;
