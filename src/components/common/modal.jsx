"use client";

import useQueryParams from "@/hooks/useQueryParams";
import BackBtn from "./backBtn";
import useModal from "@/hooks/useModal";

const Modal = ({ children, trigger = "modal" }) => {
   const { getQueryByName } = useQueryParams();
   const { closeQueryModal } = useModal();

   const isOpen = getQueryByName(trigger);

   return (
      isOpen && (
         <dialog className="modal modal-open">
            <div className="modal-box">
               <BackBtn className={"my-2"} />
               {children}
            </div>
            {/* close modal on outside click */}
            <span onClick={closeQueryModal} className="modal-backdrop"></span>
         </dialog>
      )
   );
};

export default Modal;
