"use client";

import useQueryParams from "@/hooks/useQueryParams";
import { useParams, useRouter } from "next/navigation";

const ConfirmModal = ({
   message = "Please Confirm",
   confirmBtn = "Confirm",
}) => {
   const { lang } = useParams();
   const text = {
      he: {
         cancel: "ביטול",
         confirmBtn: "אישור",
         message: "אנא אשרו פעולה",
      },
      en: {
         cancel: "Cancel",
         confirmBtn: "Confirm",
         message: "Please Confirm",
      },
   };
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
               <div> {text[lang].message}</div>
               <div className="flex gap-3 justify-center">
                  <button onClick={handleConfirm} className="btn btn-primary">
                     {text[lang].confirmBtn}
                  </button>
                  <button onClick={router.back} className="btn btn-outline">
                     {text[lang].cancel}
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
