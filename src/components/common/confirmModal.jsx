"use client";

import useQueryParams from "@/hooks/useQueryParams";
import { useRouter } from "next/navigation";

const ConfirmModal = ({
   message = "Please Confirm",
   confirmBtn = "Confirm",
}) => {
   const { getQueryByName, getPathWithNewParam } = useQueryParams();
   const router = useRouter();
   const isOpen = getQueryByName("confirm");

   async function handleConfirm() {
      const id = getQueryByName("confirm");
      const navigateTo = getPathWithNewParam("confirm", "confirmed@" + id);
      router.replace(navigateTo);
   }
   return (
      isOpen && (
         <dialog className="modal modal-open">
            <div className="modal-box text-center space-y-3">
               <div>{message}</div>
               <div className="space-x-3">
                  <button onClick={router.back} className="btn btn-outline">
                     Cancel
                  </button>
                  <button onClick={handleConfirm} className="btn btn-primary">
                     {confirmBtn}
                  </button>
               </div>
            </div>
            {/* close modal on outside click */}
            <span onClick={router.back} className="modal-backdrop"></span>
         </dialog>
      )
   );
};

export default ConfirmModal;
