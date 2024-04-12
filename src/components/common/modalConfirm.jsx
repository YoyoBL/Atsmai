"use client";

import useQueryParams from "@/hooks/useQueryParams";
import { useParams, useRouter } from "next/navigation";
import { useRef } from "react";

const ModalConfirm = ({
   message = "Please Confirm",
   confirmBtn = "Confirm",
   onConfirm = () => {},
   modalId = "",
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

   const modalRef = useRef();

   function handleConfirm() {
      closeModal();
      onConfirm();
   }

   function closeModal() {
      modalRef.current.close();
   }

   return (
      <dialog ref={modalRef} id={modalId} className="modal">
         <div className="modal-box text-center space-y-3">
            <div> {message}</div>
            <div className="flex gap-3 justify-center">
               <button onClick={handleConfirm} className="btn btn-primary">
                  {text[lang].confirmBtn}
               </button>
               <button onClick={closeModal} className="btn btn-outline">
                  {text[lang].cancel}
               </button>
            </div>
         </div>
         {/* close modal on outside click */}
         <span onClick={closeModal} className="modal-backdrop"></span>
      </dialog>
   );
};

export default ModalConfirm;
