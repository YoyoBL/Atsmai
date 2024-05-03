"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";

const ModalClient = ({ children, modalId = "id" }) => {
   const modalRef = useRef();

   function closeModal() {
      delete modalRef.current.dataset.recurring;
      modalRef.current.close();
   }
   return (
      <dialog ref={modalRef} id={modalId} className="modal ">
         <div className="modal-box w-fit">{children}</div>
         {/* close modal on outside click */}
         <span onClick={closeModal} className="modal-backdrop"></span>
      </dialog>
   );
};

export default ModalClient;
